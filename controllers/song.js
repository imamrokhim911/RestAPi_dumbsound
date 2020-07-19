const { Song, Artist } = require('../models');
const Joi = require('@hapi/joi');
const { response } = require('express');

exports.getSong = async (req, res) => {
	try {
		const { page: pageQuery, limit: limitQuery, artisId } = req.query;

		const page = pageQuery ? parseInt(pageQuery) - 1 : 0;
		const pageSize = limitQuery ? parseInt(limitQuery) : 10;

		const paginate = ({ page, pageSize }) => {
			const offset = page * pageSize;
			const limit = pageSize;

			return {
				offset,
				limit
			};
		};

		let filter = {};
		if (artisId) {
			filter.artisId = artisId;
		}

		const song = await Song.findAll(
			Object.assign(
				{
					where: filter
				},
				{
					include: [
						{
							model: Artist,
							as: 'artist',
							attributes: {
								exclude: ['createdAt', 'updatedAt']
							}
						}
					],
					order: [['createdAt', 'DESC']],
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'artisId']
					}
				},
				paginate({
					page,
					pageSize
				})
			)
		);

		if (song) {
			return res.send({
				data: song,
				paginationInfo: {
					currentPage: page + 1,
					limit: limitQuery
				}
			});
		} else {
			return res.status(400).send({
				error: {
					message: 'Films Not Found'
				}
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

exports.getDetailSong = async (req, res) => {
	try {
		const { id } = req.params;
		const song = await Song.findOne({
			where: {
				id
			},
			include: [
				{
					model: Artist,
					as: 'artist',
					attributes: {
						exclude: ['createdAt', 'updatedAt']
					}
				}
			],
			order: [['createdAt', 'DESC']],
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'artisId']
			}
		});

		if (song) {
			return res.send({
				data: song
			});
		} else {
			return res.status(400).send({
				message: 'Films Not Found'
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


exports.addSong = async (req, res) => {
	try {
		// const schema = Joi.object({
		// 	title: Joi.string().min(3).required(),
		// 	year: Joi.string().required(),
		// 	artisId: Joi.required(),
		// });
		// const { error } = schema.validate(req.body);

		// if (error)
		// 	return res.status(400).send({
		// 		error: {
		// 			message: error.details[0].message
		// 		}
		// 	});

		const { artisId } = req.body;

		const cekSong = await Artist.findOne({
			where: {
				id: artisId
			}
		});

		if (!cekSong)
			return res.status(400).send({
				message: 'Artis not found'
			});

		const song = await Song.create({
			...req.body,
			artisId,
			thumbnail: req.file.filename
		});

		if (song) {
			const SongResult = await Song.findOne({
				where: {
					id: song.id
				},
				include: {
					model: Artist,
					as: 'artist',
					attributes: {
						exclude: ['createdAt', 'updatedAt']
					}
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});

			return res.send({
				data: SongResult
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

exports.editFilm = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).required(),
			thumbnailFilm: Joi.string().required(),
			year: Joi.required(),
			category: Joi.required(),
			description: Joi.string().min(10).required()
		});
		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const { id } = req.params;

		const { category: { id: categoryId } } = req.body;

		const film = await Film.update(
			{
				...req.body,
				categoryId
			},
			{
				where: {
					id
				}
			}
		);

		if (film) {
			const filmResult = await Film.findOne({
				where: {
					id
				},
				include: {
					model: Category,
					as: 'category',
					attributes: {
						exclude: ['createdAt', 'updatedAt']
					}
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'categoryId']
				}
			});
			return res.send({
				data: filmResult
			});
		} else {
			return res.status(400).send({
				message: 'Films Not Found'
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

exports.deleteFilm = async (req, res) => {
	try {
		const { id } = req.params;
		const film = await Film.findOne({
			where: {
				id
			}
		});

		if (film) {
			await Film.destroy({
				where: {
					id
				}
			});

			return res.send({
				data: {
					id
				}
			});
		} else {
			return res.status(400).send({
				message: 'Film Not Found'
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
