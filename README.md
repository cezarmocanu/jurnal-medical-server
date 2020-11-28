# jurnal-medical-server
Server pentru Jurnalul Medical Brasov



Setup 

-creati o baza de date cu numele 'jurnalmedical'
-creati un user cu drepturi depline pt baza de date cu numele 'adminjurnalmedical' si parola 'password@JurnalMedical'

-in src/config.dev.js modificati variabila config astfel

const config = createConfig({
    sync:true, // dupa sincronizarea baze de date(dupa ce se creeaza tabelele) se seteaza inapoi la false
    database: 'jurnalmedical',
    username: 'adminjurnalmedical',
    password: 'password@JurnalMedical'
});

-aplicati comanda 'npm install' in folderul de la server pentru instalarea pachetelor
-portini cu comanda 'npm start'
