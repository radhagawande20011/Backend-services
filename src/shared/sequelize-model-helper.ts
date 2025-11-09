import { DataTypes } from "sequelize";

export const auditColomuns = {
    createdAt: {
        type: DataTypes.DATE,
    },
    createdBy: {
        type: DataTypes.INTEGER,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    updatedBy: {
        type: DataTypes.INTEGER,
    },
    deleted: {
        type: DataTypes.BOOLEAN
    }
};