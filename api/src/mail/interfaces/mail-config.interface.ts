export interface IMailConfig {
	readonly host: string;
	readonly port: string;
    readonly secure: string | boolean;
    readonly user: string;
    readonly pass: string
}
