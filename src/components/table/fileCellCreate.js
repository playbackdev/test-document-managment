import {Popup} from '../popup/popup';

export const fileCellCreate = (tableRow, index, doc) => {
    const cellElement = tableRow.insertCell(index);

    cellElement.insertAdjacentHTML('beforeend', `<i>Реквизиты:</i> ${doc.details || 'Не указаны'} `);

    if(doc.fileUrl) {
        cellElement.insertAdjacentHTML('beforeend', `
            <iframe
                src='${doc.fileUrl}' id='${doc.fileUrl}'
                frameborder='0' style='border:0;'
                width='0' height='0'>
            </iframe>
        `);

        const printButton = document.createElement('button');
        printButton.insertAdjacentHTML('afterbegin', '<i class="fas fa-print"></i> Распечатать');
        cellElement.append(printButton);
        printButton.addEventListener('click', (e) => {
            e.preventDefault();
            const frameEl = document.getElementById(doc.fileUrl);

            if(frameEl && (frameEl.contentWindow.document && frameEl.contentWindow || frameEl.contentDocument)) {
                let frameDoc = frameEl.contentWindow.document || frameEl.contentDocument;
                let embed = frameDoc.getElementsByTagName('embed');
                if (embed && embed.length > 0) {

                    frameEl.contentWindow.focus();
                    frameEl.contentWindow.print();
                } else {
                    Popup.create('Документа нет', 1500);
                }
            }
            else {
                Popup.create('Документа нет', 1500);
            }
        });
    } else {
        cellElement.insertAdjacentHTML('beforeend', `<i>Документа нет</i>`);
    }
    return cellElement;
};