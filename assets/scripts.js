'use strict';

const monthData = {
  0: {
    month: 'Janeiro',
    days: 31,
    message: 'Um ano novo cheinho de saúde para a Alice! ✨',
  },
  1: {
    month: 'Fevereiro',
    days: 28,
    message: 'O mês do amor e de muitas gotinhas de saúde! ❤️',
  },
  2: {
    month: 'Março',
    days: 31,
    message: 'A primavera chega com o sorriso da Alice! 🌸',
  },
  3: {
    month: 'Abril',
    days: 30,
    message: 'Mil sorrisos e muita vitalidade para a nossa menina! ☁️',
  },
  4: {
    month: 'Maio',
    days: 31,
    message: 'Mês das flores e da nossa flor mais bela, a Alice! 🌺',
  },
  5: {
    month: 'Junho',
    days: 30,
    message: 'Dias de sol e muita energia para crescer feliz! ☀️',
  },
  6: {
    month: 'Julho',
    days: 31,
    message: 'Férias, sol e saúde para a pequena Alice! 🍦',
  },
  7: {
    month: 'Agosto',
    days: 31,
    message: 'Mês quente e de muita hidratação e vitaminas! 🌊',
  },
  8: {
    month: 'Setembro',
    days: 30,
    message: 'Novas aventuras esperam pela Alice este mês! 🍂',
  },
  9: {
    month: 'Outubro',
    days: 31,
    message: 'Doces sorrisos e muita saúde para a nossa Alice! 🍭',
  },
  10: {
    month: 'Novembro',
    days: 30,
    message: 'Dias aconchegantes e gotinhas protetoras! 🧸',
  },
  11: {
    month: 'Dezembro',
    days: 31,
    message: 'O Natal da Alice com muita saúde e alegria! 🎄',
  },
};

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function selectMonth() {
  const selector = document.getElementById('month-select');
  const option = selector.value;
  const container = document.getElementById('container-table');
  const footer = document.getElementById('footer-actions');
  const statusHeader = document.getElementById('status-header');

  // Resetar todos os "disabled" das opções de meses
  Array.from(selector.options).forEach((option) => {
    option.disabled = false;
  });

  if (!option) {
    // Se não houver mês selecionado, esconde tudo e volta ao estado inicial
    container.classList.add('hidden');
    footer.classList.add('hidden');
    statusHeader.innerHTML = `<p class="text-gray-400 italic text-xs no-print">Selecionar o mês para gerar a tabela de controlo</p>`;
    return;
  }

  // Desabilitar a opção selecionada para evitar re-seleção
  selector.options[selector.selectedIndex].disabled = true;

  const currentYear = new Date().getFullYear();
  let monthDays = monthData[option].days;
  const footerMessage = monthData[option].message;
  const month = monthData[option].month;

  if (month === 'Fevereiro' && leapYear(currentYear)) {
    monthDays = 29;
  }

  document.getElementById('status-header').innerHTML =
    `<p class="text-gray-500 font-bold uppercase tracking-widest text-xs italic leading-none">Controlo de Vitaminas • ${month}</p>`;
  document.getElementById('custom-message').innerText = footerMessage;
  document.getElementById('container-table').classList.remove('hidden');
  document.getElementById('footer-actions').classList.remove('hidden');

  generateTable(monthDays);
}

function generateTable(days) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  // Padding extremamente reduzido para a versão de impressão
  const paddingClass = 'pt-2';

  for (let i = 1; i <= days; i++) {
    const row = `
                    <tr class="border-b border-pink-50 hover:bg-pink-50 transition-colors">
                        <td class="${paddingClass} px-2 font-bold text-gray-600 text-md row-day-cell">${i}</td>
                        <td class="${paddingClass} px-2 text-center row-day-cell"><div class="checkbox-custom"></div></td>
                        <td class="${paddingClass} px-2 text-center row-day-cell"><div class="checkbox-custom"></div></td>
                        <td class="${paddingClass} px-2 text-center row-day-cell"><div class="checkbox-custom"></div></td>
                        <td class="${paddingClass} px-2 text-center row-day-cell"><div class="checkbox-custom"></div></td>
                    </tr>
                `;
    tableBody.innerHTML += row;
  }
}
