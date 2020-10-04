export function valueChanger(value){
    var regExp = /{([^}]+)}}/g;
    const all = value.match(regExp);
    
    if(Array.isArray(all))
    all.forEach(rep=>{
        rep =rep.replace("{{","").replace("}}","");
        const splits = rep.split(".");
        let result = this;
        splits.forEach((r,index)=>{
            if(r ==="this") return;
            result = result[r];
        })
        value = value.replace(`{{${rep}}}`,result);
    });
    return value;
}