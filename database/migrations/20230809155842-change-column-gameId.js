module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.changeColumn('score', 'gameId', {
            type: Sequelize.INTEGER,
            references: {
                key: 'id',
                model: {
                    tableName: 'game',
                },
            },
            onDelete: 'SET NULL',
        });

    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.changeColumn('score', 'gameId', {
            type: Sequelize.INTEGER,

        });

    },
};