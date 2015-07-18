module.exports = {


  friendlyName: 'get authentication token',


  description: 'Obtains the authentication token after you complete the url login phase.',


  cacheable: false,


  sync: false,


  inputs: {

	code:
	{
		example: '1234435',

		description: 'Code received from the get-login-url',

		required: true
	},
	
	redirect_url:
	{
		example: 'https://localhost/url',

		description: 'Url used to redirect users once they finish using the link.',

		required: true
	},

	client_id:
	{
		example: '12345678',

		description: 'API key that is given to you when you register your application.',

		required: true
	},

	client_secret:
	{
		example: '234643dadfe',

		description: 'Secret code for your LinkedIN application.',

		required: true
	}

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },

  fn: function (inputs,exits)
  {
	var http = require('machinepack-http');

	http.sendHttpRequest({
		baseUrl: 'https://www.linkedin.com',
		url: '/uas/oauth2/accessToken',
		method: 'post',
		params:
		{
			'grant_type': 'authorization_code',
			'code' : inputs.code,
		        'redirect_uri' : inputs.redirect_url,
			'client_id' : inputs.client_id,
			'client_secret' : inputs.client_secret

		},
		headers:
		{
			'Content-Type' : 'application/x-www-form-urlencoded',
		}

	}).exec(
		{
			success: function(response)
			{
				try
				{
					var data = JSON.parse(response.body);

					return exits.success(data);

				}
				catch(e)
				{
					return exits.error(e);
				}

			},

			error: function(err)
			{
				return exits.error(err);
			}
		}
	);

  },



};
