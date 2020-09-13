import {appModel} from '../model/appModel';
import {tableModel} from "../model/tableModel";
import {table} from '../components/table/table';
import {tableRowEditForm} from '../components/table/tableRowEditForm';
import {loader} from "../components/loader/loader";
import './tablePage.css';

export const tablePage = {
    render() {
        const tPage = document.createElement('div');
        tPage.classList.add('app-content');
        tPage.insertAdjacentHTML('afterbegin', `
        <div class="table-page-header">
            <h1><i class="fas fa-laptop"></i> Личный кабинет</h1>
            <p>${appModel.user.email}</p>
        </div>
        <div class="table-page-menu">
            <h2> <i class="far fa-file-alt"></i> Список отчетных документов:</h2>  
        </div>
        <div class="table-page-content">          
        </div>
        `);
        const logoutButton = document.createElement('button');
        logoutButton.append('Выйти');
        tPage.firstElementChild.append(logoutButton);

        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            appModel.logout();
        });

        const buttonRowCreate = document.createElement('button');
        buttonRowCreate.classList.add('accept');
        buttonRowCreate.insertAdjacentHTML('afterbegin', '<i class="far fa-file"></i> Создать новый документ');
        tPage.children[1].append(buttonRowCreate);

        const buttonResetTable = document.createElement('button');
        buttonResetTable.classList.add('delete');
        buttonResetTable.insertAdjacentHTML('afterbegin', '<i class="fas fa-redo"></i> Сбросить данные к изначальным');
        tPage.children[1].append(buttonResetTable);

        buttonRowCreate.addEventListener('click', (e) => {
            e.preventDefault();
            if(!document.getElementById('form-record')) {
                tPage.lastElementChild.prepend(tableRowEditForm());
            }            
        });

        buttonResetTable.addEventListener('click', (e) => {
            e.preventDefault();
            buttonRowCreate.disabled = true;
            buttonResetTable.disabled = true;
            tableModel.reset().then(() => {
                buttonRowCreate.disabled = false;
                buttonResetTable.disabled = false;
            });
        });

        //Грузим лоадер, потом грузим данные для таблицы из БД, удаляем лоадер и вставляем таблицу
        const loaderEl = loader();
        tPage.lastElementChild.append(loaderEl);
        tableModel.fetchDocs()
        .then(() => {
            loaderEl.remove();
            tPage.lastElementChild.append(table.create());
        });



        return tPage;
    }
};

