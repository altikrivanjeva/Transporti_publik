
# Transporti Publik - React Frontend

Ky projekt është pjesë e sistemit për menaxhimin e transportit publik. Frontendi është ndërtuar me ReactJS dhe TailwindCSS.

## Instalimi dhe Nisja

1. Instalo varësitë:
	```bash
	npm install
	```
2. Starto aplikacionin:
	```bash
	npm run dev
	```

## Përdorimi

Aplikacioni mundëson:
- Regjistrimin dhe kyçjen e përdoruesve
- Shikimin e linjave të autobusëve
- Menaxhimin e kompanive, ndalesave, biletave, zbritjeve për studentë
- Dashboard për administrim

## API (Backend)

Backend-i është ndërtuar me Node.js dhe mundëson operacione CRUD për entitetet kryesore:

- **/api/auth**: Regjistrim, kyçje, autentifikim (JWT)
- **/api/linjat**: Menaxhimi i linjave të autobusëve
- **/api/companies**: Menaxhimi i kompanive
- **/api/stops**: Menaxhimi i ndalesave
- **/api/tickets**: Menaxhimi i biletave
- **/api/studentDiscount**: Menaxhimi i zbritjeve për studentë

Shembull kërkese për marrjen e linjave:
```http
GET /api/linjat
```

## Siguria

Përdoret JWT për autentifikim. Endpoint-et e mbrojtura kërkojnë token.

## Dokumentacioni

Për më shumë detaje, shiko kodin në folderin backend/ dhe frontend/src/components/.
