module.exports = {


  friendlyName: 'Share to Linkedin',


  description: 'Share links to LinkedIn',


  cacheable: false,


  sync: false,


  inputs: {

	token:
	{
		example: 'a65f23fd23t44f2f3',

		description: 'OAUTH2 token.',

		required: true
	},

 	content:
	{
		example: 'http://imgur.com/really_cool_image  or {title: "Title", description: "Description", submitted-url: "URL to be submitted", submitted-image-url: "Url to image"}',

		description: 'Link to be posted.'

	},

	comment:
	{
		example: 'Really cool comment.',

		description: 'Comment to be included with the '
	},

	visiblity:
	{
		example: 'anyone connections-only',

		description: 'anyone : publicly share this link connections-only : privately share this links',

		required: true
	}
  },

  exits: {

    success:
    {
      variableName: 'result',
      description: 'Done.',
    },

  },

  fn: function (inputs,exits)
  {

	//Data checking
	if(inputs.comment.length > 700)
	{
		return exits.error("Comment too long");
	}

	if(inputs.content['title'].length > 200)
	{
		return exits.error("Title too long");
	}

	if(inputs.content['description'].length > 256)
	{
		return exits.error("Description too long");
	}

	if(!inputs.comment && !inputs.content)
	{
		return exits.error("Can't have both comment and content empty");
	}

	var http = require('machinepack-http');

	http.sendHttpRequest({
		baseUrl: 'https://api.linkedin.com',
		url: '/v1/people/~/shares?format=json',
		method: 'post',
		params:
		{
			'Authentication': 'Bearer '+inputs.token,
			'content' : inputs.content,
			'comment' : inputs.comment,
			'visibility' : inputs.visibility
		},

		headers:
		{
			'Content-Type' : 'application/json',
			'x-li-format' : 'json'
		}

	}).exec(
		{
			success: function(response)
			{
				try
				{
					return exits.success(response.body);
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
