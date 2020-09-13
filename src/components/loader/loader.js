import './loader.css';

export const loader = () => {
    const loader = document.createElement('div');
    loader.classList.add('lds-ring');
    loader.insertAdjacentHTML('afterbegin', '<div></div><div></div><div></div><div></div>');
    return loader;
};

