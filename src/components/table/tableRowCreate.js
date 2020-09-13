import {fileCellCreate} from './fileCellCreate';
import {tableRowEditForm} from './tableRowEditForm';
import {tableModel} from "../../model/tableModel";

export const tableRowCreate = (table, index, doc) => {

    //Подготовка данных для таблицы в нужном виде
    const dateStr = (new Date(doc.reportDate)).toLocaleDateString('ru', {day:'numeric', month: 'short', year:'numeric'})
    //если до даты менее 2 дней и индикатор исполнения - не выполнено, то красим желтым,
    //если просрочено и индикатор исполнения - не выполнено, то красим красным 
    const dateClassName = (new Date().getTime() - doc.reportDate >= 0 && !doc.status)? 'alert':
                            (doc.reportDate - new Date().getTime() <= 259200000  && doc.reportDate - new Date().getTime() > 0 && !doc.status)? 'warning': '';
    //Отображение статуса
    const statusClassName = doc.status ? 'completed' : 'notcompleted';
    //отображение периодичности
    const period = doc.periodicity === 'day' ? 'Ежедневно' :
                    doc.periodicity === 'week' ? 'Еженедельно' :
                    doc.periodicity === 'month' ? 'Ежемесячно' :
                    doc.periodicity === 'quarter' ? 'Ежеквартально' :
                    doc.periodicity === 'year' ? 'Ежегодно' : 'Периодичность не указана';

    //Создание строки
    const rowElement = table.insertRow(index);
    rowElement.setAttribute('id', doc.id);
    rowElement.insertAdjacentHTML('afterbegin', `<td>${index}</td>`);
    
    fileCellCreate(rowElement, 1, doc.baseDoc);

    rowElement.insertAdjacentHTML('beforeend', `
        <td>${doc.recipient || 'Не указан'}</td>
        <td>${period}</td>
    `);

    fileCellCreate(rowElement, 4, doc.reportDoc);

    rowElement.insertAdjacentHTML('beforeend', `
        <td>${doc.addressee || 'Не указано'}</td>
        <td>
            ${doc.contact.name || 'Ф.И.О. не указано'}
            <br>тел.: ${doc.contact.phone || 'не указан'}
            <br>почта: ${doc.contact.email || 'не указана'}
        </td>
        <td class="${dateClassName}">
            ${dateStr}
        </td>
        <td class= "${statusClassName}">
            ${doc.status? 'Выполнено' : 'Не выполнено'}
        </td>
        <td>
            ${doc.executor || 'Нет исполнителя'}
        </td>
        <td></td>
    `);

    //EDIT
    const buttonRowEdit = document.createElement('button');
    buttonRowEdit.insertAdjacentHTML('afterbegin', '<i class="far fa-edit"></i>');
    rowElement.lastElementChild.append(buttonRowEdit);

    buttonRowEdit.addEventListener('click', (e) => {
        e.preventDefault();
        if(!document.getElementById('form-record')) {
            rowElement.parentElement.parentElement.before(tableRowEditForm(doc));
        } 
    });

    //DELETE
    const buttonRowDelete = document.createElement('button');
    buttonRowDelete.classList.add('delete');
    buttonRowDelete.insertAdjacentHTML('afterbegin', '<i class="far fa-trash-alt"></i>');
    rowElement.lastElementChild.append(buttonRowDelete);

    buttonRowDelete.addEventListener('click', (e) => {
        e.preventDefault();
        buttonRowDelete.disabled = true;
        buttonRowEdit.disabled = true;
        tableModel.deleteDoc(doc);
    });

    return rowElement;
};