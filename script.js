
function formatDate(dateToFormat) {
    var d = new Date(dateToFormat);
    const dateString = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dateString;
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

const BASE_API_URL = 'https://covid19-brazil-api.now.sh/api/report/v1';

let estadosBr = [];
let paisesMundo = [];

let orderBy = -1;

$(document).ready(function () {

    //Faz com que seja executado o comportamento de clique para buscar todos os estados
    //quando a página é carregada
    $("#btnBuscarTodos").click(getAllStates());

    function getAllStates() {

        $.ajax({
            type: 'GET',
            url: BASE_API_URL,
            dataType: 'json',
            success: function (resp) {

                let lista = resp.data;

                //Seleciona a tabela e limpa os registros
                const tableBody = $('#tableBrasil');
                tableBody.children().remove();

                for (let i = 0; i < lista.length; i++) {

                    const item = lista[i];

                    const tr = $('<tr>');
                    const td1 = $('<td>', { html: item.state });
                    const td2 = $('<td>', { html: item.uf });
                    const td3 = $('<td>', { html: formatNumber(item.cases) });
                    const td4 = $('<td>', { html: formatNumber(item.deaths) });
                    const td5 = $('<td>', { html: formatNumber(item.suspects) });
                    const td6 = $('<td>', { html: formatDate(item.datetime) });

                    td1.appendTo(tr);
                    td2.appendTo(tr);
                    td3.appendTo(tr);
                    td4.appendTo(tr);
                    td5.appendTo(tr);
                    td6.appendTo(tr);
                    tr.appendTo(tableBody);

                    estadosBr.push({
                        uf: item.uf,
                        state: item.state,
                        cases: item.cases,
                        deaths: item.deaths,
                        suspects: item.suspects,
                        datetime: item.datetime
                    });
                }
            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
    }

    //É acionado apenas quando ocorre o clique
    $("#btnBuscarTodos").on("click", function () {
        console.log('Clicou no botao getAllStates');

        $.ajax({
            type: 'GET',
            url: BASE_API_URL,
            dataType: 'json',
            success: function (resp) {

                let lista = resp.data;

                const tableBody = $('#tableBrasil');
                tableBody.children().remove();

                estadosBr = [];

                for (let i = 0; i < lista.length; i++) {

                    const item = lista[i];

                    const tr = $('<tr>');
                    const td1 = $('<td>', { html: item.state });
                    const td2 = $('<td>', { html: item.uf });
                    const td3 = $('<td>', { html: formatNumber(item.cases) });
                    const td4 = $('<td>', { html: formatNumber(item.deaths) });
                    const td5 = $('<td>', { html: formatNumber(item.suspects) });
                    const td6 = $('<td>', { html: formatDate(item.datetime) });

                    td1.appendTo(tr);
                    td2.appendTo(tr);
                    td3.appendTo(tr);
                    td4.appendTo(tr);
                    td5.appendTo(tr);
                    td6.appendTo(tr);
                    tr.appendTo(tableBody);

                    estadosBr.push({
                        uf: item.uf,
                        state: item.state,
                        cases: item.cases,
                        deaths: item.deaths,
                        suspects: item.suspects,
                        datetime: item.datetime
                    });
                }
            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
    });

    //Ordena pelo estado
    $('#header-table-brasil #estado').on('click', function () {

        orderBy = orderBy * -1;

        estadosBr.sort((a, b) => {
            const nameA = a.state.toUpperCase();
            const nameB = b.state.toUpperCase();
            if (nameA < nameB) {
                return -orderBy;
            }
            if (nameA > nameB) {
                return orderBy;
            }
            return 0;
        });

        atualizaListaEstados();
    });

    //Ordena pela UF
    $('#header-table-brasil #uf').on('click', function () {
        orderBy = orderBy * -1;

        estadosBr.sort((a, b) => {
            const nameA = a.uf.toUpperCase();
            const nameB = b.uf.toUpperCase();
            if (nameA < nameB) {
                return -orderBy;
            }
            if (nameA > nameB) {
                return orderBy;
            }
            return 0;
        });

        atualizaListaEstados();
    });

    //Ordena pelo número de casos
    $('#header-table-brasil #casos').on('click', function () {
        orderBy = orderBy * -1;

        estadosBr.sort((a, b) => {
            const nameA = a.cases;
            const nameB = b.cases;
            if (nameA < nameB) {
                return -orderBy;
            }
            if (nameA > nameB) {
                return orderBy;
            }
            return 0;
        });

        atualizaListaEstados();
    });

    function atualizaListaEstados() {
        const tableBody = $('#tableBrasil');
        tableBody.children().remove();

        for (let i = 0; i < estadosBr.length; i++) {
            const item = estadosBr[i];

            const tr = $('<tr>');
            const td1 = $('<td>', { html: item.state });
            const td2 = $('<td>', { html: item.uf });
            const td3 = $('<td>', { html: formatNumber(item.cases) });
            const td4 = $('<td>', { html: formatNumber(item.deaths) });
            const td5 = $('<td>', { html: formatNumber(item.suspects) });
            const td6 = $('<td>', { html: formatDate(item.datetime) });

            td1.appendTo(tr);
            td2.appendTo(tr);
            td3.appendTo(tr);
            td4.appendTo(tr);
            td5.appendTo(tr);
            td6.appendTo(tr);
            tr.appendTo(tableBody);
        }
    }

    //API para buscar um estado específico
    $("#btnBuscarUF").click(function () {

        const selectedUF = $('#selectUF').val();

        console.log(selectedUF);

        $.ajax({
            type: 'GET',
            url: BASE_API_URL + '/brazil/uf/' + selectedUF,
            dataType: 'json',
            success: function (resp) {

                console.log(resp);

                const tableBody = $('#tableBrasil');
                tableBody.children().remove();

                const item = resp;

                const tr = $('<tr>');

                const td1 = $('<td>', { html: item.state });
                const td2 = $('<td>', { html: item.uf });
                const td3 = $('<td>', { html: formatNumber(item.cases) });
                const td4 = $('<td>', { html: formatNumber(item.deaths) });
                const td5 = $('<td>', { html: formatNumber(item.suspects) });
                const td6 = $('<td>', { html: formatDate(item.datetime) });

                td1.appendTo(tr);
                td2.appendTo(tr);
                td3.appendTo(tr);
                td4.appendTo(tr);
                td5.appendTo(tr);
                td6.appendTo(tr);
                tr.appendTo(tableBody);

            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
    });

    $("#btnBuscarData").click(function () {

        const selectedDate = $('#selectedDate').val();
        const formatedDate = selectedDate.replaceAll('-', '');

        $.ajax({
            type: 'GET',
            url: BASE_API_URL + '/brazil/' + formatedDate,
            dataType: 'json',
            success: function (resp) {

                let lista = resp.data;

                const tableBody = $('#tableBrasil');
                tableBody.children().remove();

                estadosBr = [];

                for (let i = 0; i < lista.length; i++) {

                    const item = lista[i];

                    const tr = $('<tr>');
                    const td1 = $('<td>', { html: item.state });
                    const td2 = $('<td>', { html: item.uf });
                    const td3 = $('<td>', { html: formatNumber(item.cases) });
                    const td4 = $('<td>', { html: formatNumber(item.deaths) });
                    const td5 = $('<td>', { html: formatNumber(item.suspects) });
                    const td6 = $('<td>', { html: formatDate(item.datetime) });

                    td1.appendTo(tr);
                    td2.appendTo(tr);
                    td3.appendTo(tr);
                    td4.appendTo(tr);
                    td5.appendTo(tr);
                    td6.appendTo(tr);
                    tr.appendTo(tableBody);

                    estadosBr.push({
                        uf: item.uf,
                        state: item.state,
                        cases: item.cases,
                        deaths: item.deaths,
                        suspects: item.suspects,
                        datetime: item.datetime
                    });
                }
            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
    });

    //Faz com que ao clicar na aba "Mundo", os dados sejam carregados
    $('nav #nav-mundo-tab').on('click', function () {
        $("#btnBuscarTodosPaises").click();
    });

    //API para buscar todos os países
    $("#btnBuscarTodosPaises").on("click", function () {
        $.ajax({
            type: 'GET',
            url: BASE_API_URL + '/countries',
            dataType: 'json',
            success: function (resp) {

                let lista = resp.data;

                //Seleciona o select e limpa as opções
                const select = $('#selectPais');
                select.children().remove();

                //Seleciona a tabela e limpa os registros
                const tableBody = $('#tableMundo');
                tableBody.children().remove();

                paisesMundo = [];

                for (let i = 0; i < lista.length; i++) {
                    const item = lista[i];

                    //Cria uma option para cada país
                    const option = $('<option>', {
                        html: item.country,
                        value: item.country
                    });
                    option.appendTo(select);

                    //Cria uma linha para cada país
                    const tr = $('<tr>');
                    const td1 = $('<td>', { html: item.country });
                    const td2 = $('<td>', { html: formatNumber(item.confirmed) });
                    const td3 = $('<td>', { html: formatNumber(item.deaths) });
                    const td4 = $('<td>', { html: formatDate(item.updated_at) });

                    td1.appendTo(tr);
                    td2.appendTo(tr);
                    td3.appendTo(tr);
                    td4.appendTo(tr);
                    tr.appendTo(tableBody);

                    paisesMundo.push({
                        country: item.country,
                        confirmed: item.confirmed,
                        deaths: item.deaths,
                        updated_at: item.updated_at
                    });
                }
            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
    });

    //Ordena pelo nome do país
    $('#header-table-mundo #country').on('click', function () {
        orderBy = orderBy * -1;

        paisesMundo.sort((a, b) => {
            const nameA = a.country.toUpperCase();
            const nameB = b.country.toUpperCase();
            if (nameA < nameB) {
                return -orderBy;
            }
            if (nameA > nameB) {
                return orderBy;
            }
            return 0;
        });

        atualizaListaPaises();
    });

    //Ordena pelo número de casos no mundo
    $('#header-table-mundo #confirmed').on('click', function () {
        orderBy = orderBy * -1;

        paisesMundo.sort((a, b) => {
            const nameA = a.confirmed;
            const nameB = b.confirmed;
            if (nameA < nameB) {
                return -orderBy;
            }
            if (nameA > nameB) {
                return orderBy;
            }
            return 0;
        });

        atualizaListaPaises();
    });

    function atualizaListaPaises() {
        const tableBody = $('#tableMundo');
        tableBody.children().remove();

        for (let i = 0; i < paisesMundo.length; i++) {

            const item = paisesMundo[i];

            const tr = $('<tr>');
            const td1 = $('<td>', { html: item.country });
            const td2 = $('<td>', { html: formatNumber(item.confirmed) });
            const td3 = $('<td>', { html: formatNumber(item.deaths) });
            const td4 = $('<td>', { html: formatDate(item.updated_at) });

            td1.appendTo(tr);
            td2.appendTo(tr);
            td3.appendTo(tr);
            td4.appendTo(tr);
            tr.appendTo(tableBody);
        }
    }

    //API para buscar um país específico
    $("#btnBuscarPais").click(function () {

        const selectedCountry = $('#selectPais').val();

        $.ajax({
            type: 'GET',
            url: BASE_API_URL + '/' + selectedCountry,
            dataType: 'json',
            success: function (resp) {

                console.log(resp.data);

                const tableBody = $('#tableMundo');
                tableBody.children().remove();

                const item = resp.data;

                const tr = $('<tr>');
                const td1 = $('<td>', { html: item.country });
                const td2 = $('<td>', { html: formatNumber(item.confirmed) });
                const td3 = $('<td>', { html: formatNumber(item.deaths) });
                const td4 = $('<td>', { html: formatDate(item.updated_at) });

                td1.appendTo(tr);
                td2.appendTo(tr);
                td3.appendTo(tr);
                td4.appendTo(tr);
                tr.appendTo(tableBody);

            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
            }
        });
    });

    //Código para o Tooltip do Mapa
    const description = document.querySelector(".tooltip-map");

    document.querySelectorAll('path').forEach((el) =>
        el.addEventListener('mouseover', (event) => {

            const uf = event.target.id;
            const estado = estadosBr.find(e => e.uf == uf);

            event.target.className = ("enabled");
            description.classList.add("active");

            description.innerHTML = '<strong>' + estado.state + ' (' + estado.uf + ') </strong>';
            description.innerHTML = description.innerHTML + '<br>' + 'Casos: ' + formatNumber(estado.cases);
            description.innerHTML = description.innerHTML + '<br>' + 'Mortes: ' + formatNumber(estado.deaths);
            description.innerHTML = description.innerHTML + '<br>' + 'Suspeitos: ' + formatNumber(estado.suspects);
        })
    );

    document.querySelectorAll('path').forEach((el) =>
        el.addEventListener("mouseout", () => {
            description.classList.remove("active");
        })
    );

    document.onmousemove = function (e) {
        description.style.left = e.pageX + "px";
        description.style.top = (e.pageY - 8) + "px";
    };
});