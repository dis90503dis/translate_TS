<template>
    <div class="col-12 col-lg-9">
        <div class="member_info">
            <h2>帳號設定</h2>
            <ul class="member_info_menu">
                <li @click="toggleSetMemberInfo(true)"
                    :class="{ title_click: isSetMemberInfo, title_unclick: !isSetMemberInfo }">
                    會員資料</li>
                <li @click="toggleSetMemberInfo(false)"
                    :class="{ title_click: !isSetMemberInfo, title_unclick: isSetMemberInfo }">修改密碼</li>
            </ul>
            <div class="account_set row" v-if="isSetMemberInfo">

                <div class="set_name col-12 col-lg-4">
                    <label for="memName">姓名：</label>
                    <input class="account_set_input" type="text" name="memName" id="memName" v-model="member.member_name">
                </div>
                <div class="set_birthday col-12 col-lg-4">
                    <label for="memBirthday">生日：</label>
                    <input class="account_set_input" type="date" v-model="member.
                        member_birth" name="memBir" id="memBir">
                </div>
                <div class="set_email col-12 col-lg-4">
                    <label for="memEmail">Email：</label>
                    <input class="account_set_input" type="email" name="memEmail" id="memEmail"
                        v-model="member.member_email">
                </div>
                <div class="set_phone col-12 col-lg-4">
                    <label for="memPhone">手機號碼：</label>
                    <input class="account_set_input" type="tel" name="memPhone" id="memPhone" v-model="member.member_tel">
                </div>
                <div class="set_address col-12 col-lg-12">
                    <label>聯絡地址：</label>
                    <div class="address_city">
                        <select v-model="member.member_county" @change="onCityChange">
                            <option v-for="city in locations" :key="city.name" :value="city.name">
                                {{ city.name }}
                            </option>
                        </select>

                        <!-- 鄉鎮選擇器 -->
                        <select v-model="member.member_city">
                            <option v-for="district in selectedDistricts" :key="district.zip" :value="district.name">
                                {{ district.name }}
                            </option>
                        </select>
                        <input class="account_set_address" type="text" v-model="member.member_addr">
                    </div>

                </div>
                <button type="button" class="change_info_btn btn-primary" @click="changeMemberInfo">確定修改</button>
            </div>

            <div class="change_password" v-if="!isSetMemberInfo">
                <div class="old_password_area">
                    <label for="old_password">舊密碼：</label>
                    <div class="input_eye">
                        <input class="input_eye_area" id="old_password" placeholder="請輸入舊密碼"
                            :type="passwordVisible ? 'text' : 'password'" required>
                        <span class="eye" @click="togglePasswordVisibility"><i class="fa"
                                :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"></i></span>
                    </div>
                </div>
                <div class="new_password_area">
                    <label for="new_password">新密碼：</label>
                    <div class="input_eye">
                        <input class="input_eye_area" id="new_password" placeholder="請輸入新密碼(6~12碼英數字混合) "
                            :type="passwordVisible ? 'text' : 'password'" required>
                        <span class="eye" @click="togglePasswordVisibility"><i class="fa"
                                :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"></i></span>
                    </div>
                </div>
                <div class="again_new_password_area">
                    <label for="again_new_password">確認新密碼：</label>
                    <div class="input_eye">
                        <input class="input_eye_area" id="again_new_password" placeholder="請再次輸入新密碼"
                            :type="passwordVisible ? 'text' : 'password'" required>
                        <span class="eye" @click="togglePasswordVisibility"><i class="fa"
                                :class="passwordVisible ? 'fa-eye' : 'fa-eye-slash'"></i></span>
                    </div>
                </div>
                <button type="button" class="change_psw_btn btn-primary" @click="changePsw">確定修改</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { userStore } from '../stores/user.js';
export default {
    data() {
        return {
            isSetMemberInfo: true,
            member: {},
            locations: [],
            selectedDistricts: [],
            passwordVisible: false,
        }
    },
    mounted() {
        this.getLocations();
        const store = userStore();
        this.member = store.userData;
    },
    methods: {
        toggleSetMemberInfo(isSetMemberInfo) {
            this.isSetMemberInfo = isSetMemberInfo;
        },
        getLocations() {
            axios.get('https://tibamef2e.com/chd104/g3/front/taiwan_districts.json')
                .then(res => {
                    this.locations = res.data;
                    this.onCityChange();
                })
                .catch(err => console.log('讀取區域資料時發生錯誤:', err))

        },
        changeMemberInfo() {
            const store = userStore();
            store.updateMemberData(this.member);
        },
        changePsw() {
            const oldPassword = document.getElementById('old_password').value;
            const newPassword = document.getElementById('new_password').value;
            const confirmPassword = document.getElementById('again_new_password').value;

            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
            if (!passwordPattern.test(newPassword)) {
                alert('新密碼應該是6到12碼英數字混合');
                return;
            }
            if (newPassword !== confirmPassword) {
                alert('兩次輸入的新密碼不一致');
                return;
            }

            axios.post(`${import.meta.env.VITE_API_URL}/front/member/changePsw.php`, {
                member_no: this.member.member_no,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
                .then(res => {
                    alert(res.data.msg);
                })
                .catch(err => {
                    console.log('密碼更新失敗', err);
                    alert('密碼更新過程中出現錯誤');
                });
        },
        onCityChange() {
            // 更新鄉鎮列表
            const city = this.locations.find(city => city.name === this.member.member_county);
            this.selectedDistricts = city ? city.districts : [];
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
    },

}
</script>

<style lang="scss">
@import "@/assets/scss/page/_member.scss";
</style>