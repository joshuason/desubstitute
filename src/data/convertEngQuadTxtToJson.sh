#!/bin/bash

input="english_quadgrams.txt"
output="english_quadgrams.json"

echo -e "{\n\t\"english_quadgrams\": {" > $output
while read -r line
do
	key=$( echo $line | cut -f1 -d' ' )
	value=$( echo $line | cut -f2 -d' ' )
	newLine="\t\t\"$key\": $value,"
	echo -e $newLine >> $output
done < $input
echo -e "\t}\n}" >> $output
