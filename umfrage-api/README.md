Die Datei databasecreatetables.txt erstellt alle Tabllen auf den Datenbankserver

Die Datei databasecreattestuser.txt generiert uns Testuser:
Die Passwörter wurden mit der Methode hashSync("passwort", 10) von bcrypt gehasht und dann auf der Datenbank gespeichert.

user_name:      passwort:
'klaus'           '0000'
'john'            '1234'
'max'             '9999'     
'lisa'            '2468'
'anne'            'test'