module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define(
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
                defaultValue: sequelize.fn('NOW'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('NOW'),
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            timestamps: true, // use timestamp fields
            freezeTableName: true, // do not change (pluralize) table name
            paranoid: true, // add a deleted_at field for soft deletion.
        }
    );

    users.associate = function (models) {
        // associations
    };
    return users;
};
