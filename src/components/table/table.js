import {tableModel} from '../../model/tableModel';
import {tableRowCreate} from './tableRowCreate';
import {Popup} from '../popup/popup';
import './table.css';

export const table = {
    create() {
        const tableElement = document.createElement('table');
        tableElement.classList.add('table-documents');
        const pEl = document.createElement('p');
        pEl.append('Документов нет');

        const createTableHead = () => {
            tableElement.insertRow(0).insertAdjacentHTML('afterbegin', `
                <td>№</td>
                <td>Документ-основание</td>
                <td>Получатель отчетного документа</td>
                <td>Периодичность предоставления</td>
                <td>Отчетный документ</td>
                <td>Адресат</td>
                <td>Контактное лицо Учреждения</td>
                <td>Дата предоставления отчета</td>
                <td>Индикатор исполнения</td>
                <td>Текущий исполнитель</td>
                <td></td>
            `);
        };
        const createTableBody = () => {
            for(let i = 0; i < tableModel.docs.length; i++) {
                tableRowCreate(tableElement, i + 1, tableModel.docs[i] );
            }
        };

        if(tableModel.docs.length === 0 || !tableModel.docs) {
            tableElement.append(pEl);
        } else {
            createTableHead();
            createTableBody();
        }


        document.addEventListener('docsUpdated', (e) => {
            //Удаляем форму если была создана
            if(document.getElementById('form-record')) {
                document.getElementById('form-record').remove();
            }

            Popup.create(e.detail.message, 1500);

            //Перерендер таблицы
            if(pEl) { pEl.remove(); }
            if(tableElement.rows.length > 0) {
                for(let i = tableElement.rows.length - 1; i >= 0  ; i--) {
                    tableElement.rows[i].remove();
                }
            }
            if(tableModel.docs.length === 0 || !tableModel.docs) {
                tableElement.append(pEl);
            } else {
                createTableHead();
                createTableBody();
            }
        });
        return tableElement;
    }
};