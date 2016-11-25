##ANEM DE FARRA


OBJECTIUS
- Obtenir dades de les festes (nom, poble, dates, localització)
- Mostrar les festes segons geolocalització i dates
- Poder filtar per calendari i lloc
- Ampliar dades amb el registre d'usuaris (ajuntaments, organitzadors de festa,...)
- Pàgina detalls de cada festa.
- Mostrar al mapa cada festa


API google maps 
AIzaSyA5Wb_M0w4atuioOUXPQZOVlO6fJbFs0Zw

Webs d'interès
https://www.youtube.com/watch?v=XX9Kmg3qLRk 
https://www.youtube.com/watch?v=p0VxCIP_EzU

https://formden.com/blog/date-picker

__________________

PENDING TASKS

1. Scrapejar web viulafesta.cat. Agafar:
       · Nom poble/ciutat
       · Dates
       · Localització (coordenades)
       · Web poble/ciutat

2. Guardar la informació en un document json.

3. Crear base de dades MongoDB amb el json anterior.

4. Crear API de la base de dades.

        · Mostrar tots els elements
            /festes
            /festes?limit=5&page=2
        · Mostrar en ordre de geolocalització usuari
            /festes/:id/around/:km
        · Mostrar detalls de cada festa
            /festes/:id

5. Aplicació express per recollir accedir a les dades. GET

6. Aplicació Angular que mostri les festes ordenades per km.
      Coses a mostrar:
         · Nom poble /ciutat
         · Dates de la festa
         · A quants km de tu està
         · Web ajuntament

7. Filtres:
     - Per calendari/lloc: Posar dates i et diu el que hi ha al lloc o a prop.
     - Per distancia màxima

_______


8. Crear login d'usuaris => Ajuntaments o organitzadors de festes. 
   (els hi donaria jo el pasword i usuari, fer pàgina privada)?

9. Formulari per omplir dades addicionals a casa festa.
         · Nom poble /ciutat
         · Dates de la festa
         · Hora concerts
         · Lloc concerts
         · Quins grups
         · Link a spotify o web de cada grup
         · Informació adicional d'interès
         · Programa amb pdf
         · Parquings a prop
         · Web ajuntament

10. Crear un json i una base de dades de cada usuari. POST

11. Crear una pàgina /detalls per a cada festa.

12. Mostrar el contingut afegit.

13. Poder actualitzar dades i també borrar usuaris


_________

DISSENY I MAQUETACIÓ

14. Crear logo ==> Anem de farra
15. Triar colors app
16. Disseny home:
        · Logo + filtres de calendari i lloc
        · Llista de les festes
        · Filtres de distancia màxima
        · Mapa amb els lloc marcats
17. Disseny pàgina detall de cada festa
18. Disseny pàgina formulari un cop loguejat
19. Disseny pàgina de login
