Methods:
push() = Add element in the Array in the end.


-----------Add Elements in the Array--------------
var arr = [];
arr.push('item 1');
arr.push('item 2');
console.log(JSON.stringify(arr)); 
console.log(arr[0]);
console.log('array Started');
for(var i =0;i<arr.length;i++)
{
    console.log(arr[i]);
}


-----------Revered Array by method----------------
var num_arr = [1,2,3,4,5];
console.log(arr)
num_arr.reverse();
console.log(arr);

-------Reversed Array by loop--------------------
var original_Array = [1,2,3,4,5];
var reverse_Array= [];
console.log('original Array= '+ original_Array);
for(var i =reverse-array.length-1; i >=0 ;i++)
{
    reverse_Array.push(original_Array[i])
}
console.log('original Array= '+ reverse_Array);


--------Count of frequency of character-----------
var str = "programming";
var freq = [];
for(var i =0 ;i < str.length;i++){
    var ch = str[i];
    if(str>='a' && str <='z' || str>= 'A' && str <= 'Z')
    {
        if(freq[ch]){
            freq[ch]++;// Increment count if already exists
        }
        else{
            freq[ch]=1;// Initialize count
        }
    }
}
for(var key in freq){
    console.log(key+" : "+freq[key]);
}





























