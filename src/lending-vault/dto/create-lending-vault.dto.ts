import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested, isDate, } from 'class-validator';
import { ILendingVault } from "../lending-vault.interface";

class LendingVault implements ILendingVault {
    @IsNotEmpty()
    @IsString()
    hash: string;
    @IsNotEmpty()
    toAddress: string;

    @IsNotEmpty()
    fromAddress: string;

    @IsNotEmpty()
    @IsNumber()
    unixTimestamp: number;

    @IsNotEmpty()
    @IsString()
    ownerAddress: string;

    @IsNotEmpty()
    @IsString()
    amountDeposited: string;
    constructor() { }
}

class CreateLendingVaultDto {
    @IsNotEmpty()
    @IsString()
    eventID: string;

    @IsNotEmpty()
    @IsString()
    timestamp: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    specificationVersion: string;

    @ValidateNested({ each: true })
    @Type(() => LendingVault)
    @IsObject()
    data: LendingVault;

    constructor(eventID?: string, timestamp?: string, type?: string, specificationVersion?: string, data?: LendingVault) {
        this.eventID = eventID;
        this.timestamp = timestamp;
        this.type = type;
        this.specificationVersion = specificationVersion;
        this.data = data
    }
}
export { CreateLendingVaultDto };
