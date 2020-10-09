export function valueChanger(value){
    var regExp = /{{([^}]+)}}/gm;
    const all = value.match(regExp);
    
    if(Array.isArray(all))
    all.forEach(rep=>{
        rep =rep.replace("{{","").replace("}}","");
        const splits = rep.split(".");
        let result = this;
        splits.forEach((r,index)=>{
            if(r ==="this") return;
            if(result[r]){
                result = result[r];
            }
        })
        value = value.replace(`{{${rep}}}`,result);
    });
    return value;
}