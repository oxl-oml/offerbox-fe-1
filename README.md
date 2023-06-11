# OFFERBOX - Dokumentacja

Link do BE: [https://api.trashv1.ct8.pl/api/docs](https://api.trashv1.ct8.pl/api/docs)

Link do FE: [https://dev.trashv1.ct8.pl/public_nodejs/public](https://dev.trashv1.ct8.pl/public_nodejs/public)

Link do DB: [https://console.neon.tech/app/projects/offerbox](https://console.neon.tech/app/projects)


## Wymagania systemowe
Przed rozpoczęciem instalacji i uruchomienia projektu, upewnij się, że posiadasz następujące elementy:

* [PHP](https://www.php.net/downloads): Zalecana wersja to 8.2 lub nowsza. Wersje swojego PHP możesz sprawdzić wykonując polecenie `php -v`.

* [PostgreSQL](https://www.postgresql.org/download/): Zalecana wersja to 15.2 lub nowsza. Wersje swojego postgresa możesz sprawdzić wykonując polecenie `postgres --version`.

* [Composer](https://getcomposer.org/): Zalecana wersja to 2.5.5 lub nowsza. Wersje composera można sprawdzić wykonując polecenie `composer --version`.

## Zależności
Użyte biblioteki:
```json
  "require": {
    "firebase/php-jwt": "^6.4",
    "vlucas/phpdotenv": "^5.5",
    "ext-pdo": "*",
    "phpmailer/phpmailer": "^6.8",
    "fpdf/fpdf": "^1.85"
  }
```

* [firebase/php-jwt](https://github.com/firebase/php-jwt/releases) w wersji 6.4 lub nowszej. Biblioteka umożliwiająca generowanie i weryfikacje tokenów JWT.

* [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv/releases) w wersji 5.5 lub nowszej. Biblioteka ułatwiająca ładowanie zmiennych środowiskowych z pliku `.env`.

* [ext-pdo]() rozszerzenie PDO zazwyczaj dostępne już w PHP

* [phpmailer/phpmailer](https://github.com/PHPMailer/PHPMailer/releases) w wersji 6.8 lub nowszej. Biblioteka zapewniająca zaawansowane funkcje wysyłania wiadomości e-mail.

* [fpdf/fpdf](http://www.fpdf.org/) w wersji 1.85 lub nowszej. Biblioteka umożliwiająca generowanie dynamicznych dokumentów pdf.

## Struktura
Struktura jest zorganizowana w następujący sposób:

`logs/` - katalog przechowujący logi aplikacji

`resources/` - katalog ze statycznymi zasobami, zawiera pliki Czcionek, szablony maili, zdjęcia itp.

`vendor/` - katalog Composera, służy do przechowywania "zaciągniętych" zależności

`src/` - główny katalog z kodem źródłowym aplikacji

* `src/Domain/` - cała logika biznesowa aplikacji (usługi, modele)
* `src/Internal/` - infrastruktura aplikacji
* `src/Utils/` - narzędzia i pomocnicze funkcje

Diagram związków encji

<a href="https://ibb.co/kHy7JTZ"><img src="https://i.ibb.co/fNJXKSd/offerbox-erd.png" alt="offerbox-erd" border="0"></a>

## Instalacja

Aby zainstalować projekt, postępuj zgodnie z poniższymi krokami:

1. Sklonuj repozytorium na swój komputer
```bash
git clone https://github.com/oxl-oml/offerbox-fe-1
```

### Budowanie własnej wersji aplikacji

1. By zbudować aplikacje, ustaw się w `offerbox-fe-1\oxl-frontend` i wykonaj polecenie

```bash
npm i
```
Zainstaluje to wymagane zależności 

2. Następnie wykonaj polecenie

```bash
npm start
```

Uruchomi to skrypt startowy zdefiniowany w package.json

## Licencja

[MIT](https://choosealicense.com/licenses/mit/)