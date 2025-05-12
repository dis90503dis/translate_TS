import { defineStore } from 'pinia';
import axios from 'axios';


export const userStore = defineStore('userStore', {
    state: () => ({
        token: '',
        userData: {},
        isLoggedIn: false,
        showLoginModal: false,
        checkedSame: false,
    }),
    actions: {
        updateToken(memberNo) {
            if (memberNo) {
                this.token = memberNo
                localStorage.setItem('userToken', memberNo)
            } else {
                this.token = ''
                localStorage.removeItem('userToken')
            }
        },
        updateUserData(memberInfo) {
            this.userData = memberInfo
        },
        checkLogin() {
            return new Promise((resolve, reject) => {
                const storageToken = localStorage.getItem('userToken');

                axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_API_URL}/front/member/front_checkLogin.php`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ storageToken: storageToken }),
                })
                    .then(res => {
                        if (res.data.status == 'success') {
                            this.updateUserData(res.data.member);
                            resolve(true);
                        } else {
                            this.clearToken(); // 清除無效token
                            resolve(false);
                        }
                    })
                    .catch(err => {
                        console.log("驗證時發生錯誤", err);
                        reject(err); // 拒絕Promise
                    });
            });
        },
        clearToken() {
            this.token = ''
            this.userData = {}
            localStorage.clear();
        },
        toggleLoginModal(show) {
            this.showLoginModal = show;
        },
        isCheckedSame(isChecked) {
            this.checkedSame = isChecked;
        },
        updateMemberData(newUserData) {
            this.userData = newUserData;
            axios.post(`${import.meta.env.VITE_API_URL}/front/member/updateMemberInfo.php`, {
                member_no: this.userData.member_no,
                member_name: this.userData.member_name,
                member_birth: this.userData.member_birth,
                member_email: this.userData.member_email,
                member_tel: this.userData.member_tel,
                member_county: this.userData.member_county,
                member_city: this.userData.member_city,
                member_addr: this.userData.member_addr
            })
                .then((res) => {
                    alert(res.data.msg);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    },
})

