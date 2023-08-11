module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.changeColumn('score', 'userId', {
            type: Sequelize.INTEGER,
            references: {
                key: 'id',
                model: {
                    tableName: 'user',
                },
            },
            onDelete: 'SET NULL',
        });

    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('score', 'userId');

    },
};