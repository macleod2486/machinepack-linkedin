module.exports = {


  friendlyName: 'Get the login url for LinkedIn',


  description: '',


  cacheable: false,


  sync: false,


  idempotent: false,


  inputs: {
	
	client_id:
	{
		example: '12345678',
		description: 'API key that is given to you when you register your application.',
		required: true
	},

	redirecturl:
	{
		example: 'https://localhost/url',

		description: 'Url used to redirect users once they finish using the link.',

		required: true
	},

	scope:
	{
		example: 'r_fullprofile%20r_emailaddress%20w_share',

		description: 'A URL-encoded, space delimited list of member permissions your application is requesting on behalf of the user.  If you do not specify a scope in your call, we will fall back to using the default member permissions you defined in your application configuration.',

	}
  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.'
    }

  },


  fn: function (inputs,exits)
  {
	var state = (Math.random() + 1).toString(36).substring(7);
	var util = require('util');

	inputs.scope = inputs.scope || [];

	console.log(inputs.scope);

	try
	{
		return exits.success(util.format(
			   'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=%s&redirect_uri=%s&state=%s&scope=%s',
			   inputs.client_id, inputs.redirecturl, state, inputs.scope.join(',')
			  ));
	}

	catch(e)
	{
		return exits.error(e);
	}
  },


};
