
export default function (context) {


    try {



        let user = context.store.state.userInfo;
        console.log(user);
        if (!user) {
            return context.redirect('/salesman/login', context.query)
        }
    } catch (error) {
        return context.redirect('/salesman/login', context.query)
    }









}