import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head"
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { Tooltip } from 'react-tooltip';

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
      		<Head>
				<title>LeetClone</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.png' />
				<meta
					name='description'
					content='Web application that contains leetcode problems and video solutions'
				/>
			</Head>
			<div className='app-wrapper'>
				<Component {...pageProps} />
				<ToastContainer/>
				<Tooltip id="my-tooltip" className='tooltip-styling' arrowColor="transparent" offset={8}/>
			</div>
 		</RecoilRoot>
}
