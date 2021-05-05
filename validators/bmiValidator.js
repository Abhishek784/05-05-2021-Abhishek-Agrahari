let joibird=require('joibird')

class BmiCalculatorValidator{
    static validateCreating(body)
    {
        let schema=joibird.object().keys({

            gender: joibird.string().required().options({
                language: {
                    key: 'gender ',
                    string: {
                        min: 'gender required'
                    }
                }
            }),

            heightCm: joibird.number().required().options({
                language: {
                    key: 'height ',
                    string: {
                        min: 'height required'
                    }
                }
            }),

            weightKg: joibird.number().required().options({
                language: {
                    key: 'weight ',
                    string: {
                        min: 'weight required'
                    }
                }
            }),
        });
        return joibird.validate(body, schema, {
			stripUnknown: true,
			abortEarly: false
		});
    }


    static validateUpdating(body)
    {
        let schema=joibird.object().keys({

            id: joibird.string().required().options({
                language: {
                    key: 'id ',
                    string: {
                        min: 'id required'
                    }
                }
            })
            
        });
        return joibird.validate(body, schema, {
			stripUnknown: true,
			abortEarly: false
		});
    }
}

module.exports= BmiCalculatorValidator;