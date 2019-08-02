export class Jornada {

    constructor(
        public nombre?: string,
        public nombreCorto?: string,
        public _id?: string,
        public torneo?:string,
        public estatus?: string,
        public inicio?: string,
        public fin?:string
    ) { }
}
