module.exports = {
    up(queryInterface, DataTypes) {
        return queryInterface.createTable(
            'users',
            {
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                email: {
                    type: DataTypes.STRING(100),
                    unique: true,
                    allowNull: true,
                },
                phone: {
                    type: DataTypes.STRING(15),
                    unique: true,
                    allowNull: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                addresses: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.fn('NOW'),
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.fn('NOW'),
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    },

    down(queryInterface) {
        return queryInterface.dropTable('users');
    },
};
