import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { NextIcon, UserIcon } from './Icons'
import * as Tokens from '../tokens'

type CustomButtonProps = {
    text: string,
    href: string;
}

export default function SectionMenu({ text, href }: CustomButtonProps) {
  return (
    <Pressable className=' w-[352px] h-11 flex-row justify-between items-center p-2 bg-red-600 px-[15px]'>
        <View className='w-11 h-11 shadow-black shadow-md px-[15px] justify-center items-center bg-slate-50 rounded-[20px]'>
            <UserIcon size={20} color='#130138'/>
        </View>
        <Text>Brigadista</Text>
        <NextIcon size={20} color='#363853'/>
    </Pressable>
  )
}


/* vuesax/linear/profile */

/* display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;
gap: 10px;

background: #FFFFFF;
box-shadow: 0px 4px 12px rgba(39, 34, 70, 0.1); 

*/

/* Group 23 */

/* width: 352px;
height: 44px;
flex: none;
order: 0;
flex-grow: 0; */


