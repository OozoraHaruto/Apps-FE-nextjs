"use client";

import { useEffect, useState } from 'react';

import * as ls from '@/lib/helpers/localstorage';
import NavBar from '../../components/NavBar';

const passwordLengthID = "txt_passwordLength"
const passwordNoID = "txt_passwordNo"
const addNumbersID = "cbx_addNumbers"
const addLowercaseCharacterID = "cbx_addLowercaseCharacter"
const addUppercaseCharacterID = "cbx_addUppercaseCharacter"
const includeSymbolsID = "txt_includeSymbols"
const noSimilarCharacterID = "cbx_noSimilarCharacter"
const noDuplicateCharacterID = "cbx_noDuplicateCharacter"

const passwordLengthLS = "pwd_gen_passwordLength"
const passwordNoLS = "pwd_passwordNo"
const addNumbersLS = "pwd_gen_addNumbers"
const addLowercaseCharacterLS = "pwd_gen_addLowercaseCharacter"
const addUppercaseCharacterLS = "pwd_gen_addUppercaseCharacter"
const includeSymbolsLS = "pwd_gen_includeSymbols"
const noSimilarCharacterLS = "pwd_gen_noSimilarCharacter"
const noDuplicateCharacterLS = "pwd_gen_noDuplicateCharacter"

const numbers = "1234567890"
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUXWXYZ"
const similarLookingLetters = "01ǃ！״″＂＄％＆＇﹝（﹞）⁎＊+＋,‚，-‐�－.٠۔܁܂․‧。．｡/̸⁄∕╱⫻⫽／ﾉOoΟοОоՕＯｏIا１２３４５６７Ց８９։܃܄∶꞉：:;;；‹＜＝›＞?？@＠［\＼］＾＿｀ÀÁÂÃÄÅàáâãäåɑΑαаᎪＡａßʙΒβВЬᏴᛒＢｂϲϹСсᏟⅭⅽＣｃĎďĐđԁժᎠḍⅮⅾＤｄÈÉÊËéêëĒēĔĕĖėĘĚěΕЕеᎬＥｅϜＦｆɡɢԌնᏀＧｇʜΗНһᎻＨｈilɩΙІіᎥᛁⅠⅰＩｉϳЈјյᎫＪｊΚκКᏦᛕKＫｋLʟιᏞⅬⅼＬｌΜϺМᎷᛖⅯⅿＭｍɴΝＮｎΡρРрᏢＰｐႭႳＱｑʀԻᏒᚱＲｒЅѕՏႽᏚＳｓΤτТᎢＴｔμυԱՍ⋃ＵｕνѴѵᏙⅤⅴＶｖѡᎳＷｗΧχХхⅩⅹＸｘʏΥγуҮＹｙΖᏃＺｚ｛ǀ｜｝⁓～ӧӒÖӦ"

export default function Login() {
  const [ passwordLength, setPasswordLength ] = useState("20");
  const [ passwordNo, setPasswordNo ] = useState("5");
  const [ addNumbers, setAddNumbers ] = useState(true);
  const [ addLowercaseCharacter, setAddLowercaseCharacter ] = useState(true);
  const [ addUppercaseCharacter, setAddUppercaseCharacter ] = useState(true);
  const [ includeSymbols, setIncludeSymbols ] = useState("!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~");
  const [ noSimilarCharacter, setNoSimilarCharacter ] = useState(true);
  const [ noDuplicateCharacter, setNoDuplicateCharacter ] = useState(true);

  const [ needRegen, setNeedRegen ] = useState(true)
  const [ charLibrary, setCharLibrary ] = useState(undefined)
  const [ generatedPasswords, setGeneratedPasswords ] = useState(undefined)
  const [ showWarning, setShowWarning ] = useState(false)

  const getPasswordLibraryString = () => {
    let chars = ""
    if (addNumbers) {
      chars += numbers
    }
    if (addLowercaseCharacter) {
      chars += lowercaseLetters
    }
    if (addUppercaseCharacter) {
      chars += uppercaseLetters
    }
    if (includeSymbols) {
      chars += includeSymbols
    }
    if (noSimilarCharacter) {
      for (let i = 0; i < similarLookingLetters.length; i++) {
        let char = similarLookingLetters[ i ]
        chars = chars.replace(char, "")
      }
    }

    console.log("Password characters: ", chars)

    return chars
  }

  const generatePassword = () => {
    let chars = charLibrary
    if (needRegen) {
      chars = getPasswordLibraryString()
      setCharLibrary(chars)
      setNeedRegen(false)

      setShowWarning(noDuplicateCharacter && chars.length < passwordLength)
    }

    let passwords = []
    for (let i = 0; i < passwordNo; i++) {
      let c = (' ' + chars).slice(1); // copy the string
      let l = c.length
      let pwd = "" // password

      for (let j = 0; j < passwordLength; j++) {
        if (l == 0) {
          break
        }
        if (l == 1) {
          pwd += c
          break
        }

        let r = Math.floor(Math.random() * l)
        pwd += c.charAt(r)
        if (noDuplicateCharacter) {
          c = c.slice(0, r) + c.slice(r + 1)
          l--
        }
      }
      passwords.push(pwd)
    }
    setGeneratedPasswords(passwords)
  };

  useEffect(() => {
    // Get ls data here as getting when declaring throws errors
    setPasswordLength(ls.getStr(passwordLengthLS, "20"));
    setPasswordNo(ls.getStr(passwordNoLS, "5"));
    setAddNumbers(ls.getBool(addNumbersLS, true));
    setAddLowercaseCharacter(ls.getBool(addLowercaseCharacterLS, true));
    setAddUppercaseCharacter(ls.getBool(addUppercaseCharacterLS, true));
    setIncludeSymbols(ls.getStr(includeSymbolsLS, "!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~"));
    setNoSimilarCharacter(ls.getBool(noSimilarCharacterLS, true));
    setNoDuplicateCharacter(ls.getBool(noDuplicateCharacterLS, true));

    // listen to webawesome inputs events
    document.getElementById(passwordLengthID).addEventListener('input', e => {
      ls.setStr(passwordLengthLS, e.target.value)
      setPasswordLength(e.target.value)
    });
    document.getElementById(passwordNoID).addEventListener('input', e => {
      ls.setStr(passwordNoLS, e.target.value)
      setPasswordNo(e.target.value)
    });
    document.getElementById(addNumbersID).addEventListener('input', e => {
      ls.setNonStr(addNumbersLS, e.target.checked)
      setAddNumbers(e.target.checked)
      setNeedRegen(true)
    });
    document.getElementById(addLowercaseCharacterID).addEventListener('input', e => {
      ls.setNonStr(addLowercaseCharacterLS, e.target.checked)
      setAddLowercaseCharacter(e.target.checked)
      setNeedRegen(true)
    });
    document.getElementById(addUppercaseCharacterID).addEventListener('input', e => {
      ls.setNonStr(addUppercaseCharacterLS, e.target.checked)
      setAddUppercaseCharacter(e.target.checked)
      setNeedRegen(true)
    });
    document.getElementById(includeSymbolsID).addEventListener('input', e => {
      ls.setStr(includeSymbolsLS, e.target.value)
      setIncludeSymbols(e.target.value)
      setNeedRegen(true)
    });
    document.getElementById(noSimilarCharacterID).addEventListener('input', e => {
      ls.setNonStr(noSimilarCharacterLS, e.target.checked)
      setNoSimilarCharacter(e.target.checked)
      setNeedRegen(true)
    });
    document.getElementById(noDuplicateCharacterID).addEventListener('input', e => {
      ls.setNonStr(noDuplicateCharacterLS, e.target.checked)
      setNoDuplicateCharacter(e.target.checked)
    });
  }, []);


  return (
    <>
      <title>Password Generator | Haruto Apps</title>
      <meta name="description" content="Help with generating a password | Haruto Apps" />
      <NavBar />
      <main className="centerbox">
        <wa-card with-header with-footer className="card-header card-footer">
          <div slot="header">Password Generator</div>
          <form>
            <div className="wa-stack">
              <div className='evenlySpreadRow'>
                <wa-input
                  label="Password length"
                  hint={ `Estimated password strength: ${parseInt(passwordLength) > 15 ? "strong" : "weak"}` }
                  value={ passwordLength }
                  type="number"
                  id={ passwordLengthID }
                ></wa-input>
                <wa-input
                  label="No. to generate"
                  hint="Number of passwords to generate"
                  value={ passwordNo }
                  type="number"
                  id={ passwordNoID }
                ></wa-input>
              </div>
              Predfined Characters
              <wa-checkbox checked={ addNumbers } id={ addNumbersID }>
                Include numbers (e.g. 123456)
              </wa-checkbox>
              <wa-checkbox checked={ addLowercaseCharacter } id={ addLowercaseCharacterID }>
                Include Lowercase Characters (e.g. abcdef)
              </wa-checkbox>
              <wa-checkbox checked={ addUppercaseCharacter } id={ addUppercaseCharacterID }>
                Include Uppercase Characters (e.g. ABCDEF)
              </wa-checkbox>

              <wa-input
                label="Symbols"
                value={ includeSymbols }
                id={ includeSymbolsID }
              ></wa-input>

              Rules
              <wa-checkbox checked={ noSimilarCharacter } id={ noSimilarCharacterID }>
                No similar characters (e.g. i, l, 1, L, o, 0, O, etc. )
              </wa-checkbox>
              <wa-checkbox
                checked={ noDuplicateCharacter }
                id={ noDuplicateCharacterID }
                hint="Warning: Checking this significantly reduces the pool of characters and is easier to guess."
              >
                No duplicate characters
              </wa-checkbox>

              <wa-button variant="brand" onClick={ () => generatePassword() }>Generate Password</wa-button>
            </div>
            {
              (generatedPasswords || showWarning) && (
                <>
                  <wa-divider></wa-divider>
                  {
                    showWarning && <wa-callout variant="warning">
                      <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                      We only have { charLibrary.length } characters with the current selected options.<br />
                      The amount of chars is not sufficient to generate a password with no duplicates.<br />
                      Enter a number that is smaller than or equals to it or uncheck the "No duplicate characters" option.
                    </wa-callout>
                  }
                  {
                    generatedPasswords.map((pwd, i) => (
                      <div key={ `generated-pwd=${i}` } className="wa-flank:end">
                        <div className='wordWrapBreakWord'>{ pwd }</div>
                        <wa-copy-button value={ pwd }></wa-copy-button>
                      </div>
                    ))
                  }
                </>
              )
            }
          </form>
          <div slot="footer">
            All data are processed locally.
          </div>
        </wa-card>
      </main>
    </>
  );
}