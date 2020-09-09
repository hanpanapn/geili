
export default function (context) {
    try {
        let user = context.store.state.memberInfo;
      
        if (!user) {
            console.log("没有登陆", user);
            return context.redirect('/member/login', context.query)
        }
    } catch (error) {
        return context.redirect('/member/login', context.query)
    }









}