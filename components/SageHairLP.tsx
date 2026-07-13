'use client'
import { Suspense, useState } from 'react'
import GhlForm from './GhlForm'
import GclidCapture from './GclidCapture'

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const GREEN   = '#507a60'
const GOLD    = '#deb573'
const PANEL   = '#f0f5f1'
const FOOTER_BG = '#ebf1ec'
const WHITE   = '#ffffff'
const TEXT    = '#2c2e2b'
const DARK_BTN = '#1a1f1b'

// ── ICONS ────────────────────────────────────────────────────────────────

function IconCircle({ children, size = 190 }: { children: React.ReactNode; size?: number }) {
  return (
    <div className="shc-step-icon" style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: PANEL,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

// Step 1 — Schedule Your Evaluation (calendar)
function CalendarIcon() {
  return (
    <svg width="95" height="107" viewBox="0 0 106 119" fill="none" aria-hidden="true">
      <path d="M90.9954 75.52C94.906 76.8872 98.3159 79.3037 100.899 82.4312C104.086 86.2969 106 91.2427 106 96.6294C106 102.016 104.161 106.784 101.081 110.612C96.9643 115.726 90.6454 119 83.5479 119C77.2119 119 71.4865 116.385 67.4078 112.178C65.4799 110.195 63.9156 107.854 62.8316 105.267C61.7167 102.607 61.0992 99.6919 61.0992 96.6294C61.0992 85.1348 69.8056 75.6567 81.0128 74.4023C81.843 74.3101 82.6903 74.2588 83.5513 74.2588C86.1653 74.2588 88.6661 74.6997 90.9988 75.52H90.9954Z" fill={GREEN}/>
      <path d="M57.0479 83.9009C57.8197 83.9009 58.4818 84.3999 58.7219 85.0938C57.0719 88.5938 56.156 92.5005 56.156 96.6226H47.8201C46.8458 96.6226 46.0534 95.8364 46.0534 94.8623V85.668C46.0534 84.6973 46.8424 83.9043 47.8201 83.9043H57.0479V83.9009Z" fill={GREEN}/>
      <path d="M41.3297 85.6646V94.8589C41.3297 95.8296 40.5407 96.6191 39.5596 96.6191H30.3352C29.361 96.6191 28.5651 95.833 28.5651 94.8589V85.6646C28.5651 84.6938 29.361 83.9009 30.3352 83.9009H39.5596C40.5407 83.9009 41.3297 84.6938 41.3297 85.6646Z" fill={GREEN}/>
      <path d="M23.8414 85.6646V94.8589C23.8414 95.8296 23.0524 96.6191 22.0748 96.6191H12.8469C11.8727 96.6191 11.0803 95.833 11.0803 94.8589V85.6646C11.0803 84.6938 11.8693 83.9009 12.8469 83.9009H22.0748C23.049 83.9009 23.8414 84.6938 23.8414 85.6646Z" fill={GREEN}/>
      <path d="M81.0231 69.4497V66.0112C81.0231 65.0405 81.8121 64.251 82.7898 64.251H92.0176C92.9918 64.251 93.7877 65.0371 93.7877 66.0112V71.3057C90.6283 70.0342 87.167 69.3335 83.5479 69.3335C82.6937 69.3335 81.8533 69.3745 81.0197 69.4497H81.0231Z" fill={GREEN}/>
      <path d="M76.2994 66.0112V70.3008C71.8742 71.5039 67.9017 73.7905 64.6703 76.853C64.0082 76.6035 63.5314 75.9609 63.5314 75.209V66.0146C63.5314 65.0439 64.3273 64.2544 65.3015 64.2544H74.5259C75.507 64.2544 76.296 65.0405 76.296 66.0146L76.2994 66.0112Z" fill={GREEN}/>
      <path d="M58.818 66.0112V75.2056C58.818 76.1763 58.0221 76.9692 57.0479 76.9692H47.8201C46.8458 76.9692 46.0534 76.1763 46.0534 75.2056V66.0112C46.0534 65.0405 46.8424 64.251 47.8201 64.251H57.0479C58.0221 64.251 58.818 65.0371 58.818 66.0112Z" fill={GREEN}/>
      <path d="M41.3297 66.0112V75.2056C41.3297 76.1763 40.5407 76.9692 39.5596 76.9692H30.3352C29.361 76.9692 28.5651 76.1763 28.5651 75.2056V66.0112C28.5651 65.0405 29.361 64.251 30.3352 64.251H39.5596C40.5407 64.251 41.3297 65.0371 41.3297 66.0112Z" fill={GREEN}/>
      <path d="M22.0748 64.251H12.8469C11.8712 64.251 11.0803 65.0391 11.0803 66.0112V75.209C11.0803 76.1811 11.8712 76.9692 12.8469 76.9692H22.0748C23.0505 76.9692 23.8414 76.1811 23.8414 75.209V66.0112C23.8414 65.0391 23.0505 64.251 22.0748 64.251Z" fill={GREEN}/>
      <path d="M93.7877 46.3647V55.5557C93.7877 56.5264 92.9918 57.3193 92.0176 57.3193H82.7898C81.8155 57.3193 81.0231 56.5264 81.0231 55.5557V46.3647C81.0231 45.3872 81.8121 44.6011 82.7898 44.6011H92.0176C92.9918 44.6011 93.7877 45.3872 93.7877 46.3647Z" fill={GREEN}/>
      <path d="M76.2994 46.3647V55.5557C76.2994 56.5264 75.5104 57.3193 74.5293 57.3193H65.3049C64.3307 57.3193 63.5348 56.5264 63.5348 55.5557V46.3647C63.5348 45.3872 64.3307 44.6011 65.3049 44.6011H74.5293C75.5104 44.6011 76.2994 45.3872 76.2994 46.3647Z" fill={GREEN}/>
      <path d="M58.818 46.3647V55.5557C58.818 56.5264 58.0221 57.3193 57.0479 57.3193H47.8201C46.8458 57.3193 46.0534 56.5264 46.0534 55.5557V46.3647C46.0534 45.3872 46.8424 44.6011 47.8201 44.6011H57.0479C58.0221 44.6011 58.818 45.3872 58.818 46.3647Z" fill={GREEN}/>
      <path d="M41.3297 46.3647V55.5557C41.3297 56.5264 40.5407 57.3193 39.5596 57.3193H30.3352C29.361 57.3193 28.5651 56.5264 28.5651 55.5557V46.3647C28.5651 45.3872 29.361 44.6011 30.3352 44.6011H39.5596C40.5407 44.6011 41.3297 45.3872 41.3297 46.3647Z" fill={GREEN}/>
      <path d="M23.8414 46.3647V55.5557C23.8414 56.5264 23.0524 57.3193 22.0748 57.3193H12.8469C11.8727 57.3193 11.0803 56.5264 11.0803 55.5557V46.3647C11.0803 45.3872 11.8693 44.6011 12.8469 44.6011H22.0748C23.049 44.6011 23.8414 45.3872 23.8414 46.3647Z" fill={GREEN}/>
      <path d="M85.6164 5.33545V9.50195H74.9067V5.33545C74.9067 2.38574 77.3045 0 80.2616 0C81.7435 0 83.0779 0.594727 84.0487 1.56201C85.0195 2.5293 85.6164 3.85889 85.6164 5.33545Z" fill={GREEN}/>
      <path d="M85.6164 9.50195V18.71C85.6164 21.6562 83.2186 24.0454 80.2616 24.0454C77.3045 24.0454 74.9067 21.6562 74.9067 18.71V9.50195H85.6164Z" fill={GREEN}/>
      <path d="M30.3009 5.33545V9.50195H19.5911V5.33545C19.5911 2.38574 21.989 0 24.946 0C26.428 0 27.7624 0.594727 28.7332 1.56201C29.704 2.5293 30.3009 3.85889 30.3009 5.33545Z" fill={GREEN}/>
      <path d="M30.3009 9.50195V18.71C30.3009 21.6562 27.903 24.0454 24.946 24.0454C21.989 24.0454 19.5911 21.6562 19.5911 18.71V9.50195H30.3009Z" fill={GREEN}/>
      <path d="M57.3601 104.675C58.0702 106.965 59.0684 109.125 60.3171 111.111H10.7509C4.81631 111.111 0 106.312 0 100.399V20.207C0 14.2939 4.81631 9.50195 10.7509 9.50195H14.9429V18.71C14.9429 24.2061 19.4265 28.6768 24.946 28.6768C30.4656 28.6768 34.9491 24.2095 34.9491 18.71V9.50195H70.2619V18.71C70.2619 24.2061 74.7523 28.6768 80.265 28.6768C85.7777 28.6768 90.2681 24.2095 90.2681 18.71V9.50195H94.4601C100.395 9.50195 105.211 14.2939 105.211 20.207V79.9053C103.636 77.8853 101.784 76.0908 99.712 74.5801V36.5415H5.50583V97.4736C5.50583 101.449 8.74071 104.672 12.7303 104.672H57.3601V104.675Z" fill={GREEN}/>
      <path d="M82.1037 108.24C81.4176 108.24 80.7556 107.994 80.2307 107.546L69.5106 98.3042C68.3168 97.2753 68.1865 95.4741 69.219 94.2846C70.255 93.0918 72.0594 92.9653 73.2532 93.9941L81.6886 101.264L93.4515 86.1225C94.4189 84.8784 96.2165 84.6494 97.4651 85.6132C98.7138 86.5771 98.9436 88.3681 97.9763 89.6123L84.3644 107.133C83.8841 107.751 83.1671 108.148 82.385 108.227C82.289 108.237 82.1963 108.24 82.1003 108.24H82.1037Z" fill={GOLD}/>
    </svg>
  )
}

// Step 2 — Share Your Goals (path with star target)
function GoalIcon() {
  return (
    <svg width="95" height="95" viewBox="0 0 124 125" fill="none" aria-hidden="true">
      <path d="M101.963 80.3571C102.982 80.3571 103.981 80.442 104.967 80.5655C99.5599 74.5819 94.1157 74.122 92.4764 73.7411C87.4207 72.5655 81.2926 73.0655 78.0276 72.0565C77.6436 75.2366 68.321 85.6964 62.2124 92.256L59.5623 82.125C61.554 80.9643 61.9874 78.3929 61.9874 76.2545H51.9464C51.9464 78.375 52.3753 80.9182 54.3265 82.0967L51.7214 92.2545C45.6098 85.6935 36.2902 75.2336 35.9062 72.0565C32.6397 73.0699 26.5161 72.5699 21.4574 73.744C18.8867 74.3348 6.95148 75.0923 0.491928 97.1503C-0.383944 100.147 -0.0764888 103.394 1.3483 106.067C6.64553 115.994 34.4739 119.049 56.9706 119.048C65.1294 119.048 73.9841 118.641 82.2149 117.658C79.5423 113.821 77.9661 109.174 77.9661 104.167C77.9661 91.0387 88.733 80.3571 101.964 80.3571H101.963Z" fill={GREEN}/>
      <path d="M30.387 48.5848C32.7657 54.939 36.5331 61.1086 41.1945 65.6265C43.8311 68.183 46.7526 70.2068 49.8692 71.433C52.0124 72.2753 54.2455 72.7411 56.5417 72.7411C58.8379 72.7411 61.0725 72.2753 63.2142 71.433C66.4373 70.1637 69.4593 68.0431 72.1649 65.3571C76.7108 60.8542 80.3837 54.7798 82.7189 48.5327C84.5141 48.0089 86.3933 44.6726 87.1612 40.4107C87.9921 35.7887 87.2062 31.7559 85.4095 31.0818C85.4725 29.9539 85.5145 28.8125 85.5115 27.6429C85.468 10.8824 75.5649 1.13988 59.9492 0.10119C46.3342 -0.805059 36.0772 4.5625 31.4054 13.4836C29.8321 16.4851 28.9353 20.2396 28.5903 24.3199C28.0684 26.4449 27.7579 28.6518 27.7579 30.9345H27.8089C27.8089 30.9524 27.8044 30.9687 27.8044 30.9881C27.7699 30.9926 27.7384 30.994 27.7039 31C25.7137 31.3437 24.8064 35.5595 25.6807 40.4152C26.4801 44.8765 28.5093 48.3274 30.384 48.5878L30.387 48.5848Z" fill={GREEN}/>
      <path d="M108.252 84.1746C111.882 85.4478 115.048 87.6982 117.445 90.6108C120.404 94.2108 122.181 98.8168 122.181 103.833C122.181 108.85 120.474 113.29 117.614 116.855C113.793 121.617 107.927 124.667 101.339 124.667C95.4571 124.667 90.1424 122.232 86.3561 118.313C84.5665 116.467 83.1144 114.287 82.1081 111.877C81.0732 109.401 80.5 106.685 80.5 103.833C80.5 93.1286 88.582 84.3019 98.9855 83.1337C99.7561 83.0477 100.543 83 101.342 83C103.768 83 106.09 83.4106 108.255 84.1746H108.252Z" fill={GREEN}/>
      <path d="M99.7436 114.833C99.1251 114.833 98.5282 114.613 98.0551 114.211L88.3908 105.92C87.3146 104.997 87.1971 103.381 88.128 102.314C89.0619 101.244 90.6886 101.13 91.7648 102.053L99.3694 108.575L109.974 94.9919C110.846 93.8758 112.466 93.6704 113.592 94.535C114.718 95.3997 114.925 97.0064 114.053 98.1225L101.782 113.84C101.349 114.395 100.702 114.751 99.9972 114.821C99.9106 114.83 99.8271 114.833 99.7405 114.833H99.7436Z" fill={GOLD}/>
    </svg>
  )
}

// Step 3 — Hair Loss Assessment (magnifier + star badge)
function SearchIcon() {
  return (
    <svg width="102" height="108" viewBox="0 0 133 139" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M110.071 93.3247C122.735 93.3247 133 103.552 133 116.162C133 128.773 122.735 139 110.071 139C97.4076 139 87.1426 128.776 87.1426 116.162C87.1426 103.549 97.4076 93.3247 110.071 93.3247ZM37.262 80.4141C7.4524 93.7734 2.73658 92.29 1.49217 108.369C0.247756 124.452 0 131.874 0 131.874H90.2987C86.8442 127.564 84.7776 122.107 84.7776 116.162C84.7776 104.284 93.0324 94.3258 104.139 91.6674C98.866 88.9249 90.828 85.9412 78.4936 80.4113L77.5899 80.3131L67.3221 116.039L61.4858 103.047V91.4319H62.474C63.9014 91.4319 65.0698 90.2709 65.0698 88.8464V84.8279C65.0698 83.4062 63.9014 82.2424 62.474 82.2424H53.3689C51.9415 82.2424 50.7731 83.4034 50.7731 84.8279V88.8464C50.7731 90.2681 51.9387 91.4319 53.3689 91.4319H54.2699V103.047L48.4307 116.039L38.1629 80.3131L37.2591 80.4113L37.262 80.4141ZM36.8791 6.12724C35.0913 4.09137 33.3288 2.0555 31.5608 0H59.0504C68.7298 0 71.1116 2.4509 76.2751 9.76713L76.368 9.90734H76.6524L76.9452 9.91295C88.8741 10.3841 87.0075 28.6873 86.0756 36.4409C87.7986 36.8392 88.539 38.1151 88.3842 39.8341C88.0745 43.2468 87.5931 46.2137 86.9089 48.8861C84.7439 57.3661 80.2955 63.1372 74.4507 69.5365C64.5855 81.8358 48.8108 82.7191 38.6105 67.9745C34.9364 62.6661 27.881 52.5092 27.881 45.6528C27.881 43.3422 28.2217 40.5856 29.3422 38.4852C27.6164 33.0731 26.8928 26.6906 27.6361 21.0513C28.6496 13.4042 31.2116 10.9169 36.8791 6.12444V6.12724Z" fill={GREEN}/>
      <ellipse cx="110.484" cy="116.698" rx="22.5157" ry="22.3022" fill={GREEN}/>
      <path d="M110.484 104.769L113.188 113.011H121.938L114.859 118.106L117.563 126.349L110.484 121.254L103.405 126.349L106.109 118.106L99.0304 113.011H107.78L110.484 104.769Z" fill={GOLD}/>
    </svg>
  )
}

// Step 4 — Personalized Treatment Plan (handshake + confirmation badge)
function ClipboardIcon() {
  return (
    <span style={{ position: 'relative', display: 'block', width: 111, height: 108 }}>
      <svg width="111" height="63" viewBox="0 0 154 87.6722" fill="none" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 22 }}>
        <path d="M86.2875 57.7782C84.9407 59.2129 90.866 62.9138 91.7954 64.2116C94.4629 66.6311 97.1566 69.0245 99.8045 71.4635C105.401 75.9274 98.0794 82.7848 93.3835 78.4349C89.4116 75.0079 85.4787 71.532 81.5231 68.0821C79.061 65.7702 79.1197 65.9626 76.9152 68.4603C75.8391 69.7223 80.4795 72.4808 81.2426 73.5797C83.4504 76.2144 92.128 81.1218 90.204 84.5619C88.8931 88.1063 84.2102 87.9824 81.5557 86.052C79.4393 84.526 77.5772 82.6413 75.6499 80.8642C75.3075 80.5479 74.9945 80.049 74.9325 79.5958C74.2575 74.1177 71.2899 71.6787 65.9679 71.0298C65.5961 65.154 62.3383 62.0563 56.4358 61.5737C56.5206 51.9773 44.1416 48.9318 39.2403 56.588C36.364 54.1685 33.5138 51.7197 30.6017 49.3524C29.6397 48.5698 30.38 47.9144 30.6409 47.3275C35.0302 37.692 39.3185 28.0272 43.871 18.4667C48.1103 20.0938 52.0986 23.4589 56.6641 20.9383C62.1459 18.6199 67.6375 16.0864 73.7455 16.5559C73.9346 16.9961 73.9379 17.0026 74.1303 17.4428C68.7658 23.123 61.5524 27.6848 57.8511 34.666C54.3357 43.6331 68.1299 50.7741 74.3096 43.3853C76.85 41.4353 79.8469 34.4932 83.4993 37.6464C92.3596 45.7232 101.213 53.8066 110.034 61.9258C112.334 64.042 112.774 65.8615 111.743 67.9321C110.191 71.0526 106.64 71.62 103.855 69.1744C99.3708 65.2355 94.913 61.2672 90.4127 57.3477C88.1952 55.4109 88.1593 55.4565 86.294 57.7782H86.2875Z" fill={GREEN}/>
        <path d="M123.63 48.2405C120.026 51.6545 116.651 54.85 113.139 58.176C104.406 50.1904 95.2391 42.0679 86.6038 33.8998C79.1523 27.8707 74.9488 36.1008 70.1909 40.4147C66.4929 44.3341 59.7034 38.9604 63.072 34.7345C68.0549 29.2565 73.3639 24.0882 78.4577 18.7145C80.7306 16.2918 83.4569 15.6983 86.4766 16.5852C91.0845 17.9906 95.4478 20.1753 99.9839 21.7763C103.555 22.3568 106.529 19.6243 109.979 18.4634C114.597 28.5326 119.175 38.5137 123.633 48.234L123.63 48.2405Z" fill={GREEN}/>
        <path d="M152.184 39.6908C146.845 26.9381 141.487 14.1919 136.188 1.4228C135.617 0.0532937 135.03 -0.243432 133.68 0.47393C127.732 3.63359 121.758 6.74759 115.754 9.79638C114.561 10.4029 114.391 10.9409 114.933 12.1474C121.383 26.4392 127.66 40.6886 134.111 54.9968C140.812 51.3154 147.334 47.7318 154 44.07C153.322 42.4364 152.758 41.0636 152.184 39.6941V39.6908Z" fill={GREEN}/>
        <path d="M39.6935 10.5268C33.0084 25.4251 26.4276 40.0854 19.7522 54.9641C13.1355 51.3317 6.66559 47.7807 0 44.1222C5.8699 29.7358 11.8898 15.5451 17.9064 1.24672C18.3239 -0.217351 19.2043 -0.230395 20.3685 0.382624C26.9233 3.79662 33.0834 6.97258 39.6903 10.5235L39.6935 10.5268Z" fill={GREEN}/>
        <path d="M47.3277 56.5521C49.4865 56.8032 50.9148 57.8173 51.779 59.6466C53.5791 63.3671 49.1213 65.8028 47.0994 68.3104C43.5481 72.0537 37.3097 66.0637 40.3947 62.2584C42.4296 60.015 44.1873 57.2662 47.3244 56.5521H47.3277Z" fill={GREEN}/>
        <path d="M56.6119 66.0604C60.7078 66.1354 63.4731 70.6777 60.5284 73.6188C58.0109 76.2307 54.8477 81.1088 50.8822 77.7958C49.1245 76.3285 48.5114 73.7004 49.8061 72.0113C51.6975 69.8559 53.7096 66.7028 56.6119 66.0572V66.0604Z" fill={GREEN}/>
        <path d="M59.0936 83.2152C59.7132 78.823 67.2038 72.1939 70.292 78.0991C72.4932 81.5327 68.6387 84.0728 66.6103 86.4303C64.0308 89.3552 59.1196 86.6357 59.0936 83.2152Z" fill={GREEN}/>
      </svg>
      <svg width="47" height="47" viewBox="0 0 32.7475 32.2789" fill="none" aria-hidden="true" style={{ position: 'absolute', right: -7, top: 0 }}>
        <path d="M32.7475 16.1394C32.379 37.6603 0.365238 37.6571 0 16.1394C0.368499 -5.38144 32.3823 -5.37818 32.7475 16.1394Z" fill={GREEN}/>
        <path d="M15.6335 25.0347C12.5322 24.6597 12.9986 19.5469 6.68842 18.3046C3.94261 17.7307 4.90463 13.4298 7.63413 14.0852C9.38205 14.4667 12.8062 15.6405 15.3954 18.6926C16.4292 15.921 24.0177 4.24752 27.3276 8.12454C28.0353 9.08646 27.8266 10.4397 26.8613 11.1472C23.9981 13.2439 21.7251 15.8525 20.0979 18.8948C18.6076 20.9001 18.9043 25.1489 15.6302 25.0347H15.6335Z" fill="white"/>
      </svg>
    </span>
  )
}

function CheckBadge() {
  return (
    <span style={{
      flexShrink: 0,
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: GREEN,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
        <path d="M1.5 6L5.5 10L14.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

function CapabilitiesIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="19" rx="2" stroke={GREEN} strokeWidth="1.6"/>
      <rect x="8" y="1.3" width="8" height="3" rx="1" fill={GREEN}/>
      <path d="M8 11L10.5 13.5L16 8" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 17H16" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function SafetyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L20 5.5V11C20 16 16.8 20 12 22C7.2 20 4 16 4 11V5.5L12 2Z" stroke={GREEN} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M8.5 12L11 14.5L15.8 9" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PatientFirstIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21C12 21 3.5 15.5 3.5 9.5C3.5 6.5 5.8 4.3 8.6 4.3C10 4.3 11.2 5 12 6C12.8 5 14 4.3 15.4 4.3C18.2 4.3 20.5 6.5 20.5 9.5C20.5 15.5 12 21 12 21Z" stroke={GREEN} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )
}

function StarRow({ size = 16 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} style={{ fontSize: size, color: '#f5a623', lineHeight: 1 }}>&#9733;</span>
      ))}
    </div>
  )
}

function QuoteIcon() {
  return (
    <svg width="40" height="30" viewBox="0 0 48 36" fill="none" aria-hidden="true" style={{ opacity: 0.25 }}>
      <path d="M0 36V21.6C0 15.6 1.6 10.8 4.8 7.2C8 3.6 12.4 1.2 18 0L19.6 4.8C15.6 6 12.6 7.8 10.6 10.2C8.6 12.5 7.6 15 7.6 17.6H18V36H0ZM28.4 36V21.6C28.4 15.6 30 10.8 33.2 7.2C36.4 3.6 40.8 1.2 46.4 0L48 4.8C44 6 41 7.8 39 10.2C37 12.5 36 15 36 17.6H46.4V36H28.4Z" fill={GREEN}/>
    </svg>
  )
}

// ── FAQ ─────────────────────────────────────────────────────────────────────
// NOTE: Sage has not provided real FAQ content yet — matches the Figma
// placeholder copy exactly ("Frequently Asked Question Goes Here") so this
// is an obvious TODO for whoever reviews the page next, not fabricated
// medical content.
const FAQ_ITEMS = [
  { q: 'Frequently Asked Question Goes Here', a: '[Answer pending — awaiting FAQ content from Sage Hair Clinic]' },
  { q: 'Frequently Asked Question Goes Here', a: '[Answer pending — awaiting FAQ content from Sage Hair Clinic]' },
  { q: 'Frequently Asked Question Goes Here', a: '[Answer pending — awaiting FAQ content from Sage Hair Clinic]' },
  { q: 'Frequently Asked Question Goes Here', a: '[Answer pending — awaiting FAQ content from Sage Hair Clinic]' },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 className="shc-h2-xl" style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontWeight: 400,
          fontSize: 40,
          lineHeight: 1.129,
          color: TEXT,
          textAlign: 'center',
          marginBottom: 40,
        }}>
          <em style={{ fontStyle: 'italic' }}>Frequently</em> Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{ borderRadius: 16, overflow: 'hidden', borderTop: i > 0 ? '2px solid ' + GREEN : 'none' }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    background: PANEL,
                    border: 'none',
                    padding: '18px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    borderRadius: isOpen ? '16px 16px 0 0' : 16,
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 400, color: TEXT, lineHeight: 1.35 }}>{item.q}</span>
                  <span style={{ fontSize: 24, fontWeight: 300, color: GREEN, flexShrink: 0, lineHeight: 1 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div style={{ background: '#f4faf6', padding: '20px 28px 24px', borderRadius: '0 0 16px 16px' }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, color: '#666', margin: 0, fontStyle: 'italic' }}>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── PROPS ────────────────────────────────────────────────────────────────────

interface Props {
  heroFormId?: string
  bottomFormId?: string
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SageHairLP({
  heroFormId = 'JRQUSXBB48Nt2DcTGCpM',
  bottomFormId = 'gC3pfj36b8I5Xf5LnsJM',
}: Props) {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", color: TEXT }}>
      <Suspense fallback={null}><GclidCapture /></Suspense>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="shc-hero" id="form" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="/hero-photo-bg.jpg"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.18) 100%), linear-gradient(180deg, rgba(0,0,0,0) 24%, rgba(0,0,0,0.82) 95%)',
        }} />

        {/* Top bar — logo + nav buttons */}
        <div className="shc-hero-topbar" style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '32px 48px 0',
          flexWrap: 'wrap' as const,
          gap: 16,
        }}>
          <p style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 32,
            color: WHITE,
            textTransform: 'uppercase' as const,
            letterSpacing: 0.4,
            margin: 0,
          }}>
            Sage Hair Clinic
          </p>
          <div className="shc-hero-nav-btns" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const }}>
            <a
              href="tel:+18482001644"
              style={{
                background: WHITE,
                color: '#000',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'uppercase' as const,
                borderRadius: 62,
                padding: '14px 22px',
                textDecoration: 'none',
                whiteSpace: 'nowrap' as const,
              }}
            >
              (848) 200-1644
            </a>
            <a
              href="#form"
              style={{
                background: GOLD,
                color: '#000',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'uppercase' as const,
                borderRadius: 62,
                padding: '14px 22px',
                textDecoration: 'none',
                whiteSpace: 'nowrap' as const,
              }}
            >
              Book Your Consultation
            </a>
          </div>
        </div>

        {/* Content — headline + form card */}
        <div className="shc-hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 1500, margin: '0 auto', padding: 'clamp(28px, 4vh, 56px) 48px' }}>
          <div className="shc-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, alignItems: 'center' }}>

            {/* Left — headline */}
            <div className="shc-hero-left" style={{ marginTop: 160 }}>
              <h1 className="shc-hero-h1" style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
                fontSize: 'clamp(26px, 3.4vw, 46px)',
                color: WHITE,
                lineHeight: 1.15,
                marginBottom: 20,
                maxWidth: 780,
              }}>
                Medical Evaluation for<br /><em style={{ fontStyle: 'italic' }}>Thinning Hair &amp; Hair Loss Conditions</em>
              </h1>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(16px, 1.6vw, 20px)',
                color: WHITE,
                marginBottom: 10,
                lineHeight: 1.4,
                maxWidth: 540,
              }}>
                Discover the cause of hair loss and learn which treatment options fit your goals.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: WHITE,
                marginBottom: 28,
                lineHeight: 1.55,
                maxWidth: 500,
              }}>
                Request your consultation to understand hair loss patterns and explore your options.
              </p>
              <div className="shc-hero-trust" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <StarRow size={18} />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  color: WHITE,
                  lineHeight: 1.4,
                  margin: 0,
                }}>
                  Patient-Centered Care<br />
                  <span style={{ fontWeight: 400, fontSize: 'clamp(12px, 1vw, 13px)' }}>Patients appreciate our personalized, doctor-led approach.</span>
                </p>
              </div>
            </div>

            {/* Right — glass form card */}
            <div className="shc-hero-right">
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 16,
                padding: '28px 28px 24px',
                width: '100%',
                maxHeight: 645,
                overflow: 'hidden',
                boxShadow: '10px 10px 10.1px rgba(0,0,0,0.54)',
              }}>
                <div style={{ width: '125%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
                  <GhlForm formId={heroFormId} height={729} formName="Request Your Evaluation - Sage Hair Clinic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 className="shc-h2-xl" style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1.129,
            color: TEXT,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            A Hair Loss Plan - Just Four Steps Away
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: 25,
            color: TEXT,
            textAlign: 'center',
            marginBottom: 56,
            lineHeight: 'normal',
          }}>
            It&apos;s simpler than you think, and it all starts with a conversation.
          </p>

          <div className="shc-steps-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            marginBottom: 40,
          }}>
            {[
              { icon: <CalendarIcon />, title: 'Schedule Your Evaluation', text: 'Pick a time that works best for you.' },
              { icon: <GoalIcon />, title: 'Share Your Goals', text: 'Tell us what you want to improve.' },
              { icon: <SearchIcon />, title: 'Hair Loss Assessment', text: 'Your provider examines thinning patterns.' },
              { icon: <ClipboardIcon />, title: 'Personalized Treatment Plan', text: 'Get a plan tailored to your needs.' },
            ].map((step, i) => (
              <div
                key={i}
                className="shc-step-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 4px',
                }}
              >
                <IconCircle>{step.icon}</IconCircle>
                <h3 style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 24,
                  color: TEXT,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  margin: '28px 0 8px',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: TEXT, margin: 0, lineHeight: 1.5 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: TEXT,
            textAlign: 'center',
            marginTop: 24,
            lineHeight: 'normal',
          }}>
            No pressure. No sales pitch. Just answers.
          </p>
          <p style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 30,
            color: TEXT,
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 1.3,
          }}>
            No pressure. No obligation. <em style={{ fontStyle: 'italic' }}>Just honest answers about your options.</em>
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: TEXT,
            textAlign: 'center',
            marginTop: 12,
            lineHeight: 'normal',
          }}>
            You&apos;re in the right place. Most patients leave their first evaluation with a clear plan.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <a
              href="#form"
              style={{
                display: 'inline-block',
                background: GOLD,
                color: '#000',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                textTransform: 'uppercase' as const,
                borderRadius: 62,
                padding: '15px 40px',
                textDecoration: 'none',
              }}
            >
              Request Your Evaluation
            </a>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: '#777',
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 'normal',
          }}>
            Fast. Private. No obligation.
          </p>
        </div>
      </section>

      {/* ── WHY PATIENTS FEEL CONFIDENT (checklist) ─────────────────────── */}
      <section className="shc-pad" style={{ background: PANEL, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 className="shc-h2-xl" style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1.129,
            color: TEXT,
            textAlign: 'center',
            marginBottom: 12,
          }}>
            Why Patients Feel Confident Choosing Our Team - <em style={{ fontStyle: 'italic' }}>and Why You Can Too</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: TEXT,
            textAlign: 'center',
            marginBottom: 52,
            lineHeight: 'normal',
          }}>
            Real care. Real support. Real patient-first focus.
          </p>

          <div className="shc-features-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px 64px',
            marginBottom: 48,
          }}>
            {[
              { title: 'Designed Around Your Evaluation Findings', text: 'Personalized plans based on your stage, evaluation findings, and goals.' },
              { title: 'Visible, Measurable Progress', text: 'Track changes over time through follow-up assessments.' },
              { title: 'Guidance Focused on Healthy-Looking Hair Over Time', text: 'Recommendations based on proven medical and appearance-supporting approaches.' },
              { title: 'Safe Care. Proven Protocols.', text: 'Strict standards for consistent, high-quality patient care.' },
              { title: 'Tailored to You', text: 'Your plan is based on your evaluation, goals, and long-term hair needs.' },
              { title: 'Trusted by Many', text: 'Real patients. Real reviews. Real experiences.' },
              { title: 'Step-by-Step Guidance', text: 'Know what to expect during your evaluation and throughout your care plan.' },
              { title: 'Built for Real-Life Confidence', text: 'Feel prepared and confident in your everyday life again.' },
              { title: 'Support When You Need It Most', text: 'Real guidance through your evaluation, recommendations, and every step of your journey.' },
              { title: 'Start with a Free Evaluation', text: 'Get answers, options, and a personalized plan - no pressure.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <CheckBadge />
                <div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, color: GREEN, margin: '0 0 4px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#444', margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="shc-btn-row" style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' as const }}>
            <a
              href="#form"
              style={{
                background: GOLD,
                color: '#000',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                textTransform: 'uppercase' as const,
                borderRadius: 62,
                padding: '15px 32px',
                textDecoration: 'none',
                whiteSpace: 'nowrap' as const,
              }}
            >
              Request Your Consultation
            </a>
            <a
              href="#form"
              style={{
                background: DARK_BTN,
                color: WHITE,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                textTransform: 'uppercase' as const,
                borderRadius: 62,
                padding: '15px 32px',
                textDecoration: 'none',
                whiteSpace: 'nowrap' as const,
              }}
            >
              Request Your Evaluation
            </a>
          </div>
        </div>
      </section>

      {/* ── BIO ──────────────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div className="shc-bio-grid" style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: 64, alignItems: 'start' }}>

            {/* Photo — LEFT */}
            <div style={{ borderRadius: 5, overflow: 'hidden', flexShrink: 0, background: PANEL }}>
              <img
                src="/dr-bio.png"
                alt="Dr. Rajesh Patel - Sage Hair Clinic"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>

            {/* Text — RIGHT */}
            <div>
              <h2 className="shc-h2-lg" style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
                fontSize: 36,
                lineHeight: 1.129,
                color: TEXT,
                marginBottom: 16,
              }}>
                Dr. Rajesh Patel: Specialist in <em style={{ fontStyle: 'italic' }}>Hair Loss Evaluation &amp; Treatment Planning</em>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 22,
                color: TEXT,
                lineHeight: 'normal',
                marginBottom: 28,
              }}>
                Verified patient experiences from real consultations and care.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 17, lineHeight: 1.7, color: '#666', marginBottom: 20, fontStyle: 'italic' }}>
                [Bio copy pending - awaiting Dr. Patel&apos;s credentials, education, and experience details from Sage Hair Clinic. This section will be replaced with real biographical content once provided.]
              </p>
              <a
                href="#form"
                style={{
                  display: 'inline-block',
                  background: GOLD,
                  color: '#000',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  textTransform: 'uppercase' as const,
                  borderRadius: 62,
                  padding: '15px 32px',
                  textDecoration: 'none',
                }}
              >
                Request Your Evaluation
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 className="shc-h2-xl" style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1.129,
            color: TEXT,
            textAlign: 'center',
            marginBottom: 16,
          }}>
            Real Patients. <em style={{ fontStyle: 'italic' }}>Real Experiences.</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 20,
            color: TEXT,
            textAlign: 'center',
            lineHeight: 'normal',
            marginBottom: 48,
          }}>
            Verified patient experiences shared after their visit.
          </p>
          <div className="shc-reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                text: '[Testimonial pending - the placeholder review in this slot was not specific to hair restoration and has been removed. Replace with a real, consented patient testimonial.]',
                name: null,
                pending: true,
              },
              {
                text: 'Dr Patel and his staff were amazing! Very thorough and professional and cared about my concerns.',
                name: 'Frances Quiles',
                pending: false,
              },
              {
                text: 'My experience at Dr. Patel’s office was spectacular. The office staff is very courteous & attentive. It was like a piece of cake. Thanks Doc.',
                name: 'Jacqueline Verywell',
                pending: false,
              },
            ].map((review, i) => (
              <div
                key={i}
                style={{
                  background: PANEL,
                  borderRadius: 12,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <QuoteIcon />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: review.pending ? '#888' : TEXT,
                  flex: 1,
                  fontStyle: review.pending ? 'italic' : 'normal',
                }}>
                  {review.text}
                </p>
                <div>
                  <StarRow />
                  {review.name && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: GREEN, textAlign: 'center', marginTop: 12 }}>{review.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCING ────────────────────────────────────────────────────── */}
      <section className="shc-fin-outer" style={{ background: PANEL, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="shc-fin-section">

          {/* Left — text content */}
          <div className="shc-fin-left" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="shc-h2-lg" style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.129,
              color: TEXT,
              marginBottom: 14,
            }}>
              Getting Help for Hair Loss Can Be More{' '}
              <em style={{ fontStyle: 'italic' }}>Affordable </em>
              Than You Think
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 22,
              color: TEXT,
              lineHeight: 'normal',
              marginBottom: 24,
            }}>
              Flexible monthly plans built for real patients.
            </p>
            <div style={{ marginBottom: 32 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 22,
                color: TEXT,
                lineHeight: 'normal',
                marginBottom: 4,
              }}>As low as</p>
              <p className="shc-price-big" style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 66,
                color: GREEN,
                lineHeight: 1.129,
                margin: 0,
              }}>$188/mo</p>
            </div>

            {/* White card */}
            <div style={{
              background: WHITE,
              borderRadius: 15,
              padding: '32px 40px',
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 22,
                color: TEXT,
                lineHeight: 'normal',
                marginBottom: 16,
              }}>
                Fast, simple payment plans
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                color: '#888',
                lineHeight: 1.5,
                marginBottom: 24,
                fontStyle: 'italic',
              }}>
                [Financing terms pending confirmation] The above payment was calculated at 21.90% APR over 60 months. This purchase would have a total cost of $11,453. A down payment in the amount of the monthly payment amount is due at the time of purchase. Payment amount rounded up to the nearest whole number. 0% APR and other promotional rates subject to eligibility. Payment options through Cherry Technologies, Inc. are issued by the following lending partners: withcherry.com/lending-partners. See withcherry.com/terms for details.
              </p>
              <a
                href="#form"
                style={{
                  display: 'inline-block',
                  background: GOLD,
                  color: '#000',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  textTransform: 'uppercase' as const,
                  borderRadius: 62,
                  padding: '15px 32px',
                  textDecoration: 'none',
                }}
              >
                Request Your Evaluation
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div className="shc-fin-photo" style={{ borderRadius: 16, overflow: 'hidden', height: 618 }}>
            <img
              src="/financing-photo.png"
              alt=""
              aria-hidden="true"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>

        </div>
      </section>

      {/* ── CAPABILITIES / SAFETY / PATIENT-FIRST ───────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <h2 className="shc-h2-xl" style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1.129,
            color: TEXT,
            textAlign: 'center',
            marginBottom: 10,
          }}>
            Why Patients <em style={{ fontStyle: 'italic' }}>Feel Confident </em>Choosing Our Team
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 22, color: TEXT, marginBottom: 52, lineHeight: 1.5, textAlign: 'center' }}>
            Real capabilities. Real safety. Real patient-first care.
          </p>
          <div className="shc-commit-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              {
                photo: '/capabilities-photo.png',
                icon: <CapabilitiesIcon />,
                title: 'Capabilities',
                items: [
                  'Comprehensive evaluation of hair loss patterns',
                  'Personalized care plans built around your goals',
                  'Options that may include medical or appearance-supporting approaches',
                  'Support for complex cases requiring multi-factor planning',
                ],
              },
              {
                photo: '/safety-photo.png',
                icon: <SafetyIcon />,
                title: 'Safety Standards',
                items: [
                  'Evidence-based approaches reviewed by licensed medical providers',
                  'Clean, professional clinical environment with medical-grade protocols',
                  'Clear discussions about expectations, and next steps in your care plan',
                ],
              },
              {
                photo: '/patientfirst-photo.png',
                icon: <PatientFirstIcon />,
                title: 'Patient-First Philosophy',
                items: [
                  'Honest assessments - we provide recommendations only when appropriate',
                  'Personalized plans developed around your unique needs and goals',
                  'Direct communication with your doctor at every step of your care journey',
                  'Focus on long-term hair health',
                ],
              },
            ].map((col, i) => (
              <div key={i} style={{
                background: '#f8fbfa',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #dce8e5',
              }}>
                <div style={{ height: 181, overflow: 'hidden' }}>
                  <img src={col.photo} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <div style={{ marginBottom: 20 }}>{col.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, color: GREEN, marginBottom: 18 }}>
                    {col.title}
                  </h3>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {col.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#555', lineHeight: 1.55 }}>
                        <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── LOCATIONS + FOOTER FORM ──────────────────────────────────────── */}
      <section className="shc-map-outer" style={{ background: FOOTER_BG, padding: '82px 48px 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>

          <div className="shc-map-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'start' }}>

            {/* Location cards */}
            {[
              { photo: null, city: 'Metuchen, NJ', address: '171 Amboy Ave.', addressLine2: 'Metuchen, NJ 08840' },
              { photo: null, city: 'Moorestown, NJ', address: '704 E Main St A,', addressLine2: 'Moorestown, NJ 08057' },
            ].map((loc, i) => (
              <div key={i} className="shc-map-col">
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', minHeight: 260, background: '#c4c4c4' }}>
                  {/* Real practice photo pending from client */}
                  <div style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    background: '#d9d9d9',
                    borderRadius: 62,
                    padding: '10px 18px',
                  }}>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#2c2e2b',
                      textTransform: 'uppercase' as const,
                      margin: 0,
                      whiteSpace: 'nowrap' as const,
                    }}>Visit Our Practice</p>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: GREEN, fontSize: 22, margin: '16px 0 6px' }}>{loc.city}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: TEXT, margin: '0 0 12px' }}>
                  {loc.address}<br />{loc.addressLine2}
                </p>
                <a href="tel:+18482001644" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, color: GREEN }}>(848)</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, color: TEXT }}>200-1644</span>
                </a>
              </div>
            ))}

            {/* Form — RIGHT */}
            <div className="shc-form-col">
              <GhlForm formId={bottomFormId} height={742} formName="Footer Form - Sage Hair Clinic" />
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: '#666',
                lineHeight: 1.5,
                marginTop: 12,
              }}>
                <strong>I Agree.</strong> I agree to be contacted by the practice regarding my inquiry. Your information is confidential and will not be shared.
              </p>
            </div>

          </div>

        </div>

        {/* Copyright bar */}
        <div className="shc-footer-bar" style={{ textAlign: 'center', padding: '48px 48px 32px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: '#2c2e2b',
            textTransform: 'uppercase' as const,
            lineHeight: '30px',
            margin: 0,
          }}>
            &copy; 2026 Sage Hair Clinic &bull; <a href="/privacy-policy" style={{ color: '#2c2e2b', textDecoration: 'none' }}>Privacy Policy</a> &bull; <a href="/cookie-policy" style={{ color: '#2c2e2b', textDecoration: 'none' }}>Cookie Policy</a>
          </p>
        </div>
      </section>
    </div>
  )
}
