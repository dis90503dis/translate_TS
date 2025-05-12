import { defineStore } from 'pinia'
import axios from 'axios'

// ✅ 使用者資料的型別（可依照後端資料補完整）
interface UserData {
  member_no: string
  member_name?: string
  member_birth?: string
  member_email?: string
  member_tel?: string
  member_county?: string
  member_city?: string
  member_addr?: string
  [key: string]: any
}

export const userStore = defineStore('userStore', {
  state: () => ({
    token: '' as string,
    userData: {} as UserData,
    isLoggedIn: false,
    showLoginModal: false,
    checkedSame: false
  }),

  actions: {
    updateToken(memberNo: string) {
      if (memberNo) {
        this.token = memberNo
        localStorage.setItem('userToken', memberNo)
      } else {
        this.token = ''
        localStorage.removeItem('userToken')
      }
    },

    updateUserData(memberInfo: UserData) {
      this.userData = memberInfo
    },

    checkLogin(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const storageToken = localStorage.getItem('userToken')

        axios({
          method: 'post',
          url: `${import.meta.env.VITE_API_URL}/front/member/front_checkLogin.php`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ storageToken })
        })
          .then(res => {
            if (res.data.status === 'success') {
              this.updateUserData(res.data.member)
              resolve(true)
            } else {
              this.clearToken()
              resolve(false)
            }
          })
          .catch(err => {
            console.error('驗證時發生錯誤', err)
            reject(err)
          })
      })
    },

    clearToken() {
      this.token = ''
      this.userData = {} as UserData
      localStorage.clear()
    },

    toggleLoginModal(show: boolean) {
      this.showLoginModal = show
    },

    isCheckedSame(isChecked: boolean) {
      this.checkedSame = isChecked
    },

    updateMemberData(newUserData: UserData) {
      this.userData = newUserData

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
        .then(res => {
          alert(res.data.msg)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})
