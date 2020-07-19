const {
	Artist
} = require('../models');
const Joi = require('@hapi/joi');

exports.getArtist = async (req, res) => {
	try {
		const artist = await Artist.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		});

		if (artist) {
			return res.send({
				data: artist
			});
		} else {
			return res.status(400).send({
				message: 'Artist Not Found'
			});
		}
	} catch (error) {
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

exports.addArtist = async (req, res) => {
	try {
		// const schema = Joi.object({
		// 	name: Joi.string().min(3).required()
		// });
		// const {
		// 	error
		// } = schema.validate(req.body);

		// if (error)
		// 	return res.status(400).send({
		// 		error: {
		// 			message: error.details[0].message
		// 		}
		// 	});

		const artist = await Artist.create(req.body);

		if (artist) {
			const ArtistResult = await Artist.findOne({
				where: {
					id: artist.id
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});
			return res.send({
				data: ArtistResult
			});
		} else {
			return res.status(400).send({
				message: 'Please Try Again'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};
