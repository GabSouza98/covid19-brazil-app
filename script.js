
function formatDate(dateToFormat) {
    var d = new Date(dateToFormat); //2023-11-17 13:30:30
    const dateString = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return dateString;
}

function formatNumber(num) {
    //Regex que pega grupos de 3 e coloca o ponto de milhar
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

/*
    Site com os endpoints da API que utilizamos:
    https://covid19-brazil-api-docs.vercel.app/
*/
const BASE_API_URL = 'https://covid19-brazil-api.now.sh/api/report/v1';

let estadosBr = [];
let paisesMundo = [];
let orderBy = -1;

let regioes = [
    { uf: "AC", regiao: "norte" },
    { uf: "AM", regiao: "norte" },
    { uf: "AP", regiao: "norte" },
    { uf: "PA", regiao: "norte" },
    { uf: "RO", regiao: "norte" },
    { uf: "RR", regiao: "norte" },
    { uf: "TO", regiao: "norte" },
    { uf: "AL", regiao: "nordeste" },
    { uf: "BA", regiao: "nordeste" },
    { uf: "CE", regiao: "nordeste" },
    { uf: "MA", regiao: "nordeste" },
    { uf: "PB", regiao: "nordeste" },
    { uf: "PE", regiao: "nordeste" },
    { uf: "PI", regiao: "nordeste" },
    { uf: "RN", regiao: "nordeste" },
    { uf: "SE", regiao: "nordeste" },
    { uf: "GO", regiao: "centro-oeste" },
    { uf: "MS", regiao: "centro-oeste" },
    { uf: "MT", regiao: "centro-oeste" },
    { uf: "ES", regiao: "sudeste" },
    { uf: "RJ", regiao: "sudeste" },
    { uf: "MG", regiao: "sudeste" },
    { uf: "SP", regiao: "sudeste" },
    { uf: "PR", regiao: "sul" },
    { uf: "RS", regiao: "sul" },
    { uf: "SC", regiao: "sul" },
    { uf: "DF", regiao: "" },
]

$(document).ready(function () {

    //Faz com que seja executado o comportamento de clique para buscar todos os estados
    //quando a página é carregada
    $("#btnBuscarTodos").click(getAllStates());

    //Busca todos os estados
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

    //API para buscar um estado específico
    $("#btnBuscarUF").click(function () {

        const selectedUF = $('#selectUF').val();

        console.log(selectedUF);

        $.ajax({
            type: 'GET',
            url: BASE_API_URL + '/brazil/uf/' + selectedUF,
            dataType: 'json',
            success: function (resp) {

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
        const formatedDate = selectedDate.replaceAll('-', ''); //De 2023-11-08 para 20231108

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

    //API para buscar um país específico
    $("#btnBuscarPais").click(function () {

        const selectedCountry = $('#selectPais').val();

        $.ajax({
            type: 'GET',
            url: BASE_API_URL + '/' + selectedCountry,
            dataType: 'json',
            success: function (resp) {

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

    //Ordenações
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

    /* 
        Vídeo utilizado de inspiração para o código da linha 506 a 534
        https://www.youtube.com/watch?v=QXQUjzdGZ8Y
    */

    //Código para o Tooltip do Mapa
    const description = document.querySelector(".tooltip-map");

    document.querySelectorAll('path').forEach((el) =>
        el.addEventListener('mouseover', (event) => {

            //event.target retorna o elemento <path>
            //event.target.id retorna o ID do elemento path, que é a UF em letras maiúsculas (AC, PE, RS, SC, SP...)
            const uf = event.target.id;
            const estado = estadosBr.find(e => e.uf == uf);

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

    //Cria um mapa de calor a partir da escala do número de casos de covid por estado
    $("#mapaCalorCovid").on('click', function () {

        // Cores usadas para calcular o mapa de calor
        var start = new Color(128, 255, 120), //verde fraco
            end = new Color(10, 143, 0)       //verde forte

        var startColors = start.getColors();
        var endColors = end.getColors();

        //Apaga as classes padrão dos <path>
        $('path').attr('class', '');

        //Array de número de casos
        const cases = estadosBr.map(e => { return e.cases; })

        //Máximo e mínimo de casos para usar na escala
        const max = Math.max(...cases);
        const min = Math.min(...cases);

        //Range de variação do número de casos
        const range = max - min;

        estadosBr.forEach(estado => {

            //Percentual do máximo de casos deste estado
            var percentCases = estado.cases / range;
            //Converte decimal para porcentagem e limita em 100%
            var val = parseInt(percentCases * 100);
            if (val > 100) { val = 100; }

            var r = Interpolate(startColors.r, endColors.r, 50, val);
            var g = Interpolate(startColors.g, endColors.g, 50, val);
            var b = Interpolate(startColors.b, endColors.b, 50, val);

            $('path[id="' + estado.uf + '"]').css('fill', 'rgb(' + r + ',' + g + ',' + b + ')');
            
            // const hsl = RGBToHSL(r, g, b);
            // $('path[id="' + estado.uf + '"]').css('fill', 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)');
        });
    });

    //Volta para o estado inicial do mapa, com as classes por região
    $("#mapaPorRegioes").on('click', function () {
        estadosBr.forEach(estado => {
            const reg = regioes.find(reg => reg.uf == estado.uf);
            $('path[id="' + estado.uf + '"]').attr('class', reg.regiao);
        });
    });

    /*
        Inspiração a partir do StackOverflow:
        https://stackoverflow.com/questions/11849308/generate-colors-between-red-and-green-for-an-input-range
    */
    function Interpolate(start, end, steps, count) {
        var s = start,
            e = end,
            final = s + (((e - s) / steps) * count);
        return Math.floor(final);
    };

    class Color {
        constructor(_r, _g, _b) {
            var r, g, b;
            var setColors = function (_r, _g, _b) {
                r = _r;
                g = _g;
                b = _b;
            };

            setColors(_r, _g, _b);
            this.getColors = function () {
                var colors = {
                    r: r,
                    g: g,
                    b: b
                };
                return colors;
            };
        }
    };

    // A partir de https://www.30secondsofcode.org/js/s/rgb-to-hsl/
    function RGBToHSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s
            ? l === r
                ? (g - b) / s
                : l === g
                    ? 2 + (b - r) / s
                    : 4 + (r - g) / s
            : 0;
        return [
            60 * h < 0 ? 60 * h + 360 : 60 * h,
            100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
            (100 * (2 * l - s)) / 2,
        ];
    };

});