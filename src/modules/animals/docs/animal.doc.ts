export const AnimalDocs = {
    description: 'Dados do animal e imagens para upload',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'Nome do animal',
                example: 'Rex',
            },
            description: {
                type: 'string',
                description: 'Descrição do animal',
                example: 'Cachorro muito carinhoso',
            },
            age: {
                type: 'integer',
                description: 'Idade em anos',
                example: 3,
            },
            species: {
                type: 'string',
                description: 'Espécie do animal',
                example: 'Cachorro',
            },
            breed: {
                type: 'string',
                description: 'Raça (opcional)',
                example: 'Golden Retriever',
            },
            adopted: {
                type: 'boolean',
                description: 'Status de adoção',
                example: false,
            },
            ong_id: {
                type: 'integer',
                description: 'ID da ONG',
                example: 1,
            },
            files: {
                type: 'array',
                items: {
                    type: 'string',
                    format: 'binary',
                },
                description:
                    'Imagens do animal (máximo 5 arquivos, formatos: jpg, jpeg, png, webp)',
            },
        },
        required: ['name', 'description', 'age', 'species', 'ong_id'],
    },
};
