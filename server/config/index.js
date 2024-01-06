'use strict';

var env=process.env.NODE_ENV || 'development';

var config=require(`${__dirname}/env/${env}`);

module.exports=config;
