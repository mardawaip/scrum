const setBaseUrl = () => {
    let link;
    switch (window.location.hostname) {
        case 'scrum.mardawa.id': link = 'https://scrum-api.mardawa.id/'; break;
    
        default: link = 'http://localhost:8000/'; break;
    }

    return link;
}

const AppConfig = {
    title: 'SCRUM APLIKASI',
    sub_title: 'Monitoring Scrum Progres Aplikasi',
    logo: '/assets/images/logo/logo_mardawa.png',
    avatar: 'https://scrum-api.mardawa.id/demo1/media/avatars/blank.png',
    client: 'PT. Mardawa Intiguna Persada',
    baseUrl: setBaseUrl(),
}

export default AppConfig;