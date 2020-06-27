require('dotenv').config();

const kmlParse = require('kml-parse');
const { readFileSync } = require('fs');
const { DOMParser } = require('xmldom');
const robustPoint = require('robust-point-in-polygon');
const Geocoding = require('@mapquest/geocoding');

const kmlDom = new DOMParser().parseFromString(readFileSync('./assets/Outlet.kml', 'utf8'));
const location = kmlParse.parse(kmlDom).geoJSON.features;

const client = new Geocoding({ key: process.env.GOOGLE_API_KEY })

const NOT_FOUND = 'not found';
const INTERNAL_SERVER_ERROR = 'Internal server error';

exports.getNearByOutlet = async (req, res) => {

    try {
        const _address = await client.forward(req.params.address);

        for(item of location){
            if (item.geometry.type === 'Polygon') {
                const outlet = robustPoint(item.geometry.coordinates[0], _address.geometry.coordinates);
                if (isOutletAvailable(outlet)) {
                    const status = 200;
                    
                    return res.status(status).json({
                        status : status,
                        timestamp : new Date(),
                        data : {
                            message : item.properties.name
                        }
                    });
                }
            }
        }

        const status = 404;
        return res.status(status).json({
            status : status,
            timestamp : new Date(),
            data : {
                message: NOT_FOUND,    
            }
        });

    } catch (error) {
        const status = 500;
        return res.status(status).json({
            status : status,
            timestamp : new Date(),
            data : {
                message: INTERNAL_SERVER_ERROR,    
            },
            error
        });
    }
}

function isOutletAvailable(outlet) {
    return outlet === -1 || outlet === 0;
}