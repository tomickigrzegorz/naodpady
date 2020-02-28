// kolory
const colors = ['brown', 'yellow', 'blue', 'green', 'gray', 'other', 'reset'];

// tekst na dole
const trashFullName = [
  'BIO',
  'Metale i tworzywa sztuczne',
  'Papier',
  'Szkło',
  'Zmieszane',
  'Inne',
  'RESET',
];

const cookieInfo = `
<div id="info--cookie" class="info--cookie">
  <div class="info--contener">
    <button class="info menu__toggler active" aria-label="Zamknij politykę cookies"><span></span></button>
    <h1>Polityka prywatności</h1>
    <section>
      <h2>PLIKI COOKIE</h2>
      <p>Pliki cookie strony <b>naOdpady.pl</b> nie służą identyfikacji użytkowników i na ich podstawie nie jest ustalana niczyja tożsamość. Nie przechowują żadnych informacji o charakterze poufnym. W każdej chwili możliwe jest samodzielne zarządzanie plikami cookie bezpośrednio z poziomu przeglądarki, w tym ograniczenie, zablokowanie lub usunięcie plików cookie z tej strony internetowej.</p>

      <p>Używamy cookie ponieważ:
      <ul>
        <li>pozwalają gromadzić dane statystyczne</li>
        <li>pozwalają śledzić zachowanie użytkowników na stronie a my to wykorzystujemy do optymalizacji i poprawy działania naOdpady.pl</li>
      </ul> 
      </p>

      <p>Na naOdpady.pl korzystamy z usług internetowych firm trzecich (Google)</p>
      
      <p>Aby wyłączyć lub ograniczyć działanie polików cookies na swoim komputerze prosimy zapoznać się z informacjami dostępnymi na witrynie producenta używanej przez Państwa przeglądarki internetowej.</p>
    </section>
    
  </div>
</div>
`;

// sciezka do json - listy smieci
const trashlistJSON = `./trashlist/${process.env.TRASH_LIST}`;

export { colors, cookieInfo, trashFullName, trashlistJSON };
