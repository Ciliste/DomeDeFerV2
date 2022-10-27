#!/bin/bash

while [ true ] 
do

    for login in $(w | cut -f1 -d" " | sed "1,2d") 
    do
		str=""
        if [[ "$login" != "$(whoami)" ]] 
        then

            #killList=$(ps -ef | grep $login | cut -d" " -f1,4 | grep $login |cut -d" " -f2)
            #zenity --notification --window-icon="error" --title="Sheesh" --timeout=1 --text="$(date +%H-%M-%S) : $(cat ~/DomeDeFer/logins.txt | grep $login | cut -d"|" -f2)"
            if [[ "$str" != "" ]]
			then
				str="${str}/"
			fi
			str="${str}${login}"
        fi
		echo $str
    done
done