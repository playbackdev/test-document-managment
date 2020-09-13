import firebase from 'firebase';
import 'firebase/database';

export const tableModel = {
    docs: [],
    initialState: [
        {   
            baseDoc: { details: 'Реквизиты документа-основания номер один', fileUrl: './res/baseDocs/11.pdf' }, //документ-основание: реквизиты, файл для печати
            recipient: 'Витальев Виталий Витальевич', //получатель
            periodicity: 'week', //периодичность
            reportDoc: { details: 'Реквизиты отчетного документа номер один', fileUrl: './res/reportDocs/12.pdf' }, //отчетный документа: информация, файл для печати
            addressee: 'Сергеев Сергей Сергеевич', //адресат
            contact: { name: 'Иванов Иван Иванович', phone: '+7-654-32-10', email: 'Ivanov.I.I@site.com' }, //контактное лицо Учреждения: ФИО, тел, почта
            reportDate: 1599119223930, //дата предоставления отчета
            status: false, //индикатор исполнения
            executor: 'Скворцова Вера Павловна' //текущий исполнитель
        },
        {   
            baseDoc: { details: 'Реквизиты документа-основания номер два', fileUrl: './res/baseDocs/21.pdf' }, //документ-основание: реквизиты, файл для печати
            recipient: 'Антонов Антон Антонович', //получатель
            periodicity: 'month', //периодичность
            reportDoc: { details: 'Реквизиты отчетного документа номер два', fileUrl: './res/reportDocs/22.pdf' }, //отчетный документа: информация, файл для печати
            addressee: 'Медведева Дарья Васильевна', //адресат
            contact: { name: 'Васильев Василий Васильевич', phone: '+7-123-45-67', email: 'Vasiliev.V.V@site.com' }, //контактное лицо Учреждения: ФИО, тел, почта
            reportDate: 1600128000000, //дата предоставления отчета
            status: false, //индикатор исполнения
            executor: null//текущий исполнитель
        },
        {   
            baseDoc: { details: 'Реквизиты документа-основания номер три', fileUrl: './res/baseDocs/31.pdf' }, //документ-основание: реквизиты, файл для печати
            recipient: 'Волкова Татьяна Борисовна', //получатель
            periodicity: 'quarter', //периодичность
            reportDoc: { details: 'Реквизиты отчетного документа номер три', fileUrl: './res/reportDocs/32.pdf' }, //отчетный документа: информация, файл для печати
            addressee: 'Кошкина Галина Сергеевна', //адресат
            contact: { name: 'Федоров Федор Федорович', phone: '+7-800-55-35-35', email: 'Fedorov.F.F@site.com' }, //контактное лицо Учреждения: ФИО, тел, почта
            reportDate: 1599609600000, //дата предоставления отчета
            status: true, //индикатор исполнения
            executor: 'Зайцева Тамара Артемовна' //текущий исполнитель
        }
    ],
    async fetchDocs() {
        try {
            await firebase.database()
                .ref('/docs/')
                .once('value')
                .then((snapshot) => {
                    const responseData = snapshot.val();
                    if(responseData) {
                        this.docs = Object.keys(responseData).map(key => ({
                            ...responseData[key],
                            id: key,
                        }));
                    } else {
                        this.docs = [];
                    }
                    return Promise.resolve(this.docs);
                });
        } catch(err) {
            return await Promise.reject(err);
        }
    },
    async updateDoc(docId, docData) {
        try {
            await firebase.database()
                .ref('/docs/')
                .child(docId)
                .update(docData);
            const index = this.getDocIndexById(docId);
            this.docs[index] = {...docData, id: docId};
            document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'update', message: 'Изменения сохранены'}
            }));
        } catch(err) {
            document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'error', message: 'Произошла ошибка'}
            }));
        }
    },
    async createDoc(doc) {
        try {
            const newDocId = await firebase.database()
                .ref('/docs/')
                .push(doc).getKey();
            if(newDocId) {
                this.docs.push({...doc, id: newDocId});
                document.dispatchEvent(new CustomEvent('docsUpdated', {
                    detail: {type: 'create', message: 'Документ создан'}
                }));
            }
        } catch(err) {
            document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'error', message: 'Произошла ошибка'}
            }));
        }
    },
    async deleteDoc(doc) {
        try {
             await firebase.database().ref('/docs/').child(doc.id).remove();
             this.docs.splice(this.getDocIndexById(doc.id), 1);
             document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'delete', message: 'Документ удален'}
            }));
        } catch(err) {
            document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'error', message: 'Произошла ошибка'}
            }));
        }

    },
    async reset() {
        try {
            await firebase.database().ref('/docs/').remove();
            await firebase.database()
                .ref('/docs/')
                .push(this.initialState[0]);
            await firebase.database()
                .ref('/docs/')
                .push(this.initialState[1]);
            await firebase.database()
                .ref('/docs/')
                .push(this.initialState[2]);
            this.docs = [];
            await this.fetchDocs();
            document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'reset', message: 'Все данные в таблице сброшены к первоначальным'}
            }));
            return await Promise.resolve(this.docs);
        } catch(err) {
            document.dispatchEvent(new CustomEvent('docsUpdated', {
                detail: {type: 'error', message: 'Произошла ошибка'}
            }));
        }
    },
    getDocIndexById(docId) {
        return this.docs.findIndex((doc) => doc.id === docId);
    }
};