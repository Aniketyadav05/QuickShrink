import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
    const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

    if(error) {
        console.error(error.message);
        throw new Error("Unable to load URLS")
    }

    return data;
}
export async function deleteUrl(id) {
    const {data, error} = await supabase
    .from("urls")
    .delete()
    .eq("id",id)
    if(error) {
        console.error(error.message);
        throw new Error("Unable to delete URLS")
    }

    return data;
}
export async function createUrl({title,longUrl,customUrl,user_id}, qrcode){
    const short_url = Math.random().toString(36).substring()
    const fileName = `qr-{short_url}`
    const {error:storageError} = await supabase.storage.from("qrs").upload(fileName,qrcode)
    if(storageError) throw new Error(storageError.message)

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    const {data,error} = await supabase.from("urls").insert([
        {
            title,
            original_Url: longUrl,
            customUrl: customUrl || null,
            user_id,
            short_url,
            qr
    }
    ]).select();
    if(error){
        console.error(error.message)
        throw new Error("ERROR CREATIGN SHORT URL")
    }

}