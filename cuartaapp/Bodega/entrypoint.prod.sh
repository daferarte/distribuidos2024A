#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then 
    echo "Esperando por postgres"

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done

    echo "postgres iniciado"
fi

# python manage.py flush 

exec "$@"