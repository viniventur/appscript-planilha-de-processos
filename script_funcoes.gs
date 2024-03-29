/* 
***************** FUNÇÕES NORMAIS *****************
Olá! Código feito por Vinícius Ventura - Estagiário SOP/SEPLAG/AL - Insta: @vinicius.ventura_ - Github: https://github.com/viniventur
Código de Appscript do Planilhas Google (Google Sheets)
Última atualização: 12/09/2023
*/

/** @OnlyCurrentDoc */

// Função de registro de processos na base

function REGBASE() {

  var data = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm");
  var spreadsheet = SpreadsheetApp.getActive();
  var headerval1 = spreadsheet.getRange('B3:J3').getValues() // VALORES PARA REGISTRO ATÉ OBJ - OBRIGATORIO
  var headerval2 = spreadsheet.getRange('O3').getValues() // VALOR DE RECEBIMENTO PARA REGISTRO - OBRIGATORIO
  var headerval = headerval1[0].concat(headerval2[0]) // REGISTROS OBRIGATÓRIOS
  var sit = spreadsheet.getRange('B3').getValue()
  var orig_rec = spreadsheet.getRange('C3').getValue()
  var nproc = spreadsheet.getRange('E3').getValue()
  var valor = spreadsheet.getRange('I3').getValue()
  var obs = spreadsheet.getRange('K3').getDisplayValue()
  var datarec = spreadsheet.getRange('O3').getDisplayValue()
  var datapub = spreadsheet.getRange('P3').getDisplayValue()
  var ndecreto = spreadsheet.getRange('Q3').getValue()
  var headerreg = spreadsheet.getRange('\'Processos Base\'!B3:Q3'); // VALORES PARA REGISTRO TOTAL 
  var regbios = spreadsheet.getRange('\'BIOS\'!J2:Y2')
  var novregdata = spreadsheet.getRange('\'Processos Base\'!R6');
  var mesanobios = spreadsheet.getRange('\'BIOS\'!AA2:AB2');
  var mesanoreg = spreadsheet.getRange('\'Processos Base\'!S6:T6')
  var ultlinha = spreadsheet.getLastRow()
  var sheet = spreadsheet.getSheetByName('Processos Base')
  var processos = sheet.getRange(6, 5, sheet.getLastRow(), 1).getValues().flat();
  var numproc = sheet.getRange(3, 5).getValue();
  var regexata = /ata\s\d+/;
  var regexdata = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  var padraonumerico = /^\d+(\.\d+)?$/;

  if (nproc == "") {
    SpreadsheetApp.getUi().alert("Requisitos obrigatórios vazios!");
    return;
  } else if ((headerval.indexOf("") > -1)) {
    SpreadsheetApp.getUi().alert("Requisitos obrigatórios vazios!");
    return;
  } else if ((headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0) && (!(regexdata.test(datarec)))) {
    SpreadsheetApp.getUi().alert("Formato inválido. Por favor, insira datas no formato dd/mm/yyyy.");
    return;
  } else if ((sit != "Publicado") && (datapub != "") && (ndecreto != "") && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("O processo não foi publicado, porém informações referentes à publicação foram registradas.");
    return;
  } else if ((sit == "Publicado") && (datapub == "") && (ndecreto == "") && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("Insira as informações de publicação.");
    return;
  } else if ((sit == "Publicado") && (datapub == "") && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("Insira a data de publicação.");
    return;
  } else if ((sit == "Publicado") && (ndecreto == "") && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("Insira o número do decreto da publicação.");
    return;
  } else if ((sit == "Publicado") && (!(regexdata.test(datapub))) && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("Formato inválido. Por favor, insira datas no formato dd/mm/yyyy.");
    return;
  } else if ((sit == "Publicado") && (!(padraonumerico.test(ndecreto))) && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("Formato inválido. Por favor, insira apenas números no campo 'Nº do decreto'.");
    return;
  } else if ((!(padraonumerico.test(valor))) && (headerval.indexOf("") == -1) && (processos.indexOf(numproc) < 0)) {
    SpreadsheetApp.getUi().alert("Formato inválido. Por favor, insira apenas números no campo 'Valor'.");
    return;
  } else if ((sit == "Aprovado - CPOF") && (headerval.indexOf("") == -1) && (!(regexata.test(obs.toLowerCase())))) {
    SpreadsheetApp.getUi().alert('Insira o número da ata do CPOF (exemplo: digite "10" para ata 10).');
    return;
  } else if ((sit == "Publicado") && (headerval.indexOf("") == -1) && (orig_rec == "Sem Cobertura")) {
    SpreadsheetApp.getUi().alert('O processo consta como PUBLICADO porém a origem de recurso está SEM COBERTURA. Por favor, insira uma origem de recursos do tipo "Sem Cobertura - Atendido por..."');
    return;
  } else if ((headerval.indexOf("") == -1) && (processos.indexOf(numproc) >= 0)) {
  SpreadsheetApp.getUi().alert("Processo já consta na base!");
    return;
  } else if (processos.indexOf(numproc) >= 0) {
    SpreadsheetApp.getUi().alert("Processo já consta na base!");
    return;
  } else {
  spreadsheet.insertRowsBefore(6, 1);
  headerreg.copyTo(spreadsheet.getRange('B6'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  novregdata.setValue(data);
  mesanobios.copyTo(mesanoreg, SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);
  headerreg.clear({contentsOnly: true, skipFilteredRows: true});
  regbios.copyTo(headerreg, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  }
};

// Adicionar linhas simples

function adlinhas() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B3:C3').insertCells(SpreadsheetApp.Dimension.ROWS);
  spreadsheet.getRange('B4:C4').copyTo(spreadsheet.getRange('B3:C3'), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
};

// função de enviar email

function enviaremail() {
  var app = SpreadsheetApp
  var mail = MailApp;
  var drive = DriveApp;
  var ss = app.getActiveSpreadsheet();
  var ss_limite = ss.getSheetByName("LIMITE");
  var ss_geral = ss.getSheetByName("GERAL");
  var saldo = ss_geral.getRange("G9").getDisplayValue();
  var valor_limi = ss_geral.getRange("D9").getDisplayValue();
  var limite_porc = ss_geral.getRange("C9").getDisplayValue();
  var limite_utili_porc = ss_geral.getRange("F9").getDisplayValue();
  var valor_utili = ss_limite.getRange("B4").getDisplayValue();
  var ultatua = ss_limite.getRange("D2").getDisplayValue();
  var email = ss_limite.getRange("I2").getValue();
  var assunto = "Limite Usado: "+limite_utili_porc+" - Saldo: "+saldo+" - LIMITE DE CRÉDITO - ATUALIZAÇÃO"
  var html = "<h1>Informações do Limite de Crédito</h1><b>Valor aprovado com limite de "+limite_porc+":</b> "+valor_limi+"<br><b>Valor utilizado: </b>"+valor_utili+"<br><b>Saldo:</b> "+saldo+"<br><b>% Utilizado:</b> "+limite_utili_porc+"<br><br><b>Última atualização do valor: "+ultatua+"</b><br><br><b>Atenção: Este email é enviado a partir de uma automatização e os valores contidos nele são dependentes dos valores registrados na planilha de execução, portanto, não são advindos diretamente do SIAFE.</b>"

  mail.sendEmail({
    name: "Atualização Limite",
    to: email,
    subject: assunto,
    htmlBody: html
  }); 

}

// função de atualizar filtragem manual

function atualizarfiltromanual() {
  var spreadsheet = SpreadsheetApp.getActive();
  var data = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm");
  var sheets = spreadsheet.getSheets();
  
  var filtragemSheetNames = [];
  
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var sheetName = sheet.getName();
    
    if (sheetName.indexOf('FILTRAGEM - ') === 0) {
      filtragemSheetNames.push(sheetName);
    }
  }

  var nomeplanilha = spreadsheet.getSheetName();

  if (filtragemSheetNames.indexOf(nomeplanilha) !== -1) {
    var sheet = spreadsheet.getSheetByName(nomeplanilha);
    var header = sheet.getRange('B2:T2');
    var dadosbase = spreadsheet.getRange('\'Processos Base\'!B5:T')
    var dadosfiltro = sheet.getRange('B2:T');
    var datacel = sheet.getRange('V1');
    if (header.getFilter() == null) {
      sheet = spreadsheet.getSheetByName(nomeplanilha);
      intev = sheet.getRange(3, 2, sheet.getLastRow(), 19);
      intev.clear({contentsOnly: false, skipFilteredRows: false});
      //intev.clearConditionalFormatRules();
      dadosbase.copyTo(header, SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
      dadosbase.copyTo(header, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
      dadosfiltro.createFilter();
      datacel.setValue(data);
    } else {
      spreadsheet.getActiveSheet().getFilter().remove();
      sheet = spreadsheet.getSheetByName(nomeplanilha);
      intev = sheet.getRange(3, 2, sheet.getLastRow(), 19);
      intev.clear({contentsOnly: true, skipFilteredRows: true});
      dadosbase.copyTo(header, SpreadsheetApp.CopyPasteType. PASTE_VALUES, false);
      dadosbase.copyTo(header, SpreadsheetApp.CopyPasteType. PASTE_FORMAT, false);
      dadosfiltro.createFilter();
      datacel.setValue(data);
    }
  } else {
    var ui = SpreadsheetApp.getUi();
    ui.alert("Planilha não permitida para a função");
  }
};

function redefinirfiltro() {
  var spreadsheet = SpreadsheetApp.getActive();
  var nomeplanilha = spreadsheet.getSheetName();
  var sheet = spreadsheet.getSheetByName(nomeplanilha);
  var header = sheet.getRange('B1:T1');
  var dadosfiltro = sheet.getRange('B1:T');
  if (header.getFilter() == null) {
    sheet = spreadsheet.getSheetByName(nomeplanilha);
    dadosfiltro.createFilter();
  } else {
    dadosfiltro.getFilter().remove();
    dadosfiltro.createFilter();
  }
}

function atualizarresumolimite() {
  var spreadsheet = SpreadsheetApp.getActive();
  var ss = spreadsheet.getSheetByName('Texto Atualização Publicados');
  var ss_base = spreadsheet.getSheetByName('rascunho resumo publi');
  var dados = ss_base.getRange(2, 1, ss_base.getLastRow()-1, 5);
  var dados_filtro = ss.getRange('E3:I100');
  var dados_data_base = ss_base.getRange('F2:F3');
  var dados_data = ss.getRange('L2:L3');
  var data = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm:ss");
  var datacel = ss.getRange('Q2');

  dados_filtro.clear({contentsOnly: true});
  dados_data.clear({contentsOnly: true});
  dados.copyTo(dados_filtro, {contentsOnly: true});
  dados_data_base.copyTo(dados_data, {contentsOnly: true});
  datacel.setValue(data);
  dados_filtro.sort(7);
}

function registrarnota() {
  
  var ss = SpreadsheetApp.getActive()
  var ss_reg = ss.getSheetByName('Registro Nota')
  var ss_base = ss.getSheetByName('base_nrs')
  var int_reg = ss_reg.getRange(2, 2, ss_reg.getLastRow(), 3)
  var int_base = ss_base.getRange(ss_base.getLastRow()+1,1)


  int_reg.copyTo(int_base, SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  int_reg.clear({contentsOnly: true})
  //Logger.log(ss_reg.getLastRow())

}
