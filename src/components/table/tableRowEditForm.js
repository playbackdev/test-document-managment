import {tableModel} from '../../model/tableModel';
import {dateToFormStr, name2obj} from '../../utils';
import './tableRowEditForm.css';

export const tableRowEditForm = (doc = null) => {
    console.log(doc);
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('form-wrapper');
    formWrapper.setAttribute('id', 'form-record');
    const formElement = document.createElement('form');
    formElement.setAttribute('name', 'form-record');
    formElement.classList.add('form-record');
    formWrapper.append(formElement);

    let dateStr = '';
    if(doc && doc.reportDate) {
        dateStr = dateToFormStr(doc.reportDate);
     }

    formElement.insertAdjacentHTML('afterbegin', `
        <fieldset>
            <legend>Документ основание</legend>
            <div class='form-item'>
                <label for='id-baseDoc-details'>Реквизиты</label>
                <input id='id-baseDoc-details' name='baseDoc.details' data-nested=true type='text' placeholder='Реквизиты' value='${doc && doc.baseDoc.details || ''}'/>
            </div>
            <div class='form-item'>
                <label for='id-baseDoc-fileUrl'>Ссылка на документ</label>
                <input id='id-baseDoc-fileUrl' name='baseDoc.fileUrl' data-nested=true type='text' placeholder='Ссылка на документ' value='${doc && doc.baseDoc.fileUrl || ''}'/>
            </div>
        </fieldset>
        
        <div class='form-item'>
            <label for='id-recipient'>Получатель отчетного документа</label>
            <input id='id-recipient' name='recipient' type='text' placeholder='Ф.И.О. получателя' value='${doc && doc.recipient || ''}'/>
        </div>
        <div class='form-item'>
            <label for='id-periodicity'>Периодичность предоставления</label>
            <select id='id-periodicity' name='periodicity'>
                    <option ${doc && !doc.periodicity || !doc ? 'selected' : ''} value=''>Без указания периодичности</option>
                    <option ${doc && doc.periodicity === 'day' ? 'selected' : ''} value='day'>Ежедневно</option>
                    <option ${doc && doc.periodicity === 'week' ? 'selected' : ''} value='week'>Еженедельно</option>
                    <option ${doc && doc.periodicity === 'month' ? 'selected' : ''} value='month'>Ежемесячно</option>
                    <option ${doc && doc.periodicity === 'quarter' ? 'selected' : ''} value='quarter'>Ежеквартально</option>
                    <option ${doc && doc.periodicity === 'year' ? 'selected' : ''} value='year'>Ежегодно</option>
            </select>
        </div>
        <fieldset>
            <legend>Отчетный документ</legend>
            <div class='form-item'>
                <label for='id-reportDoc-details'>Реквизиты</label>
                <input id='id-reportDoc-details' name='reportDoc.details' data-nested='true' type='text' placeholder='Реквизиты' value='${doc && doc.reportDoc.details || ''}'/>
            </div>
            <div class='form-item'>
                <label for='id-reportDoc-fileUrl'>Ссылка на документ</label>
                <input id='id-reportDoc-fileUrl' name='reportDoc.fileUrl' data-nested='true' type='text' placeholder='Ссылка на документ' value='${doc && doc.reportDoc.fileUrl || ''}'/>
            </div>
        </fieldset>
        <div class='form-item'>
            <label for='id-addressee'>Адресат</label>
            <input id='id-addressee' name='addressee' type='text' placeholder='Введите адресата' value='${doc && doc.addressee || ''}'/>
        </div>
        <fieldset>
            <legend>Контактное лицо Учреждения</legend>
            <div class='form-item'>
                <label for='id-contact-name'>Ф.И.О.</label>
                <input id='id-contact-name' name='contact.name' data-nested='true' type='text' placeholder='Ф.И.О. контактного лица' value='${doc && doc.contact.name || ''}'/>
            </div>
            <div class='form-item'>
                <label for='id-contact-phone'>Телефон</label>
                <input id='id-contact-phone' name='contact.phone' data-nested='true' type='text' placeholder='Телефон контактного лица' value='${doc && doc.contact.phone || ''}'/>
            </div>
            <div class='form-item'>
                <label for='id-contact-email'>Почта</label>
                <input id='id-contact-email' name='contact.email' data-nested='true' type='text' placeholder='Почта контактного лица' value='${doc && doc.contact.email || ''}'/>
            </div>
        </fieldset>
        <div class='form-item'>
            <label for='id-reportDate'>Дата предоставления отчета</label>
            <input id='id-reportDate' name='reportDate' type='date' placeholder='Введите дату' value='${dateStr}'/>
        </div>
        <div class='form-item'>
            <label for='id-status'>Индикатор исполнения</label>
            <input id='id-status' name='status' type='checkbox' placeholder='Ссылка на документ' ${doc && doc.status?'checked="checked"':''}'/>
        </div>
        <div class='form-item'>
            <label for='id-executor'>Текущий исполнитель</label>
            <input id='id-executor' name='executor' type='text' placeholder='Текущий исполнитель' value='${doc && doc.executor || ''}'/>
        </div> 
        <div class='form-item'>
        </div> 
    `);

    const buttonRecordCreate = document.createElement('button');
    buttonRecordCreate.classList.add('accept');
    buttonRecordCreate.append(doc?'Сохранить изменения':'Создать');
    formElement.lastElementChild.append(buttonRecordCreate);

    const buttonCancel = document.createElement('button');
    buttonCancel.append('Отмена');
    formElement.lastElementChild.append(buttonCancel);

    buttonCancel.addEventListener('click', (e) => {
        e.preventDefault();
        formWrapper.remove();
    });

    buttonRecordCreate.addEventListener('click', (e) => {
        e.preventDefault();

        buttonRecordCreate.disabled = true;
        buttonCancel.disabled = true;

        let formData = { };
        //собираем данные из формы
        for(let i = 0; i < document.forms['form-record'].elements.length; i++) {
            let el = document.forms['form-record'].elements[i];
            if(el.name) {
                if(el.type === 'checkbox') {
                    formData[el.name] = el.checked;
                } else if(el.type === 'date') {
                    formData[el.name] = (el.value? new Date(el.value) : new Date()).getTime();
                } else {
                    if(el.dataset.nested) {
                        name2obj(formData, el.name, el.value);
                    } else {
                        formData[el.name] = el.value;
                    }
                }
            }
        }
        //Если редактируем запись - то у нас есть объект doc
        if(doc) {
            tableModel.updateDoc(doc.id, formData);
        } else {
            tableModel.createDoc(formData);
        }
    });

    return formWrapper;
};