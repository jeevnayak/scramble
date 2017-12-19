import collections
import json

def generateWordList(length):
    with open("3esl.txt", "r") as tinydict:
        with open("6of12.txt", "r") as smalldict:
            with open("2of12inf.txt", "r") as mediumdict:
                with open("enable2k.txt", "r") as bigdict:
                    with open("wordlist.txt", "w") as outfile:
                        tinydict_words = set()
                        tinydict_scrambles = set()
                        for line in tinydict:
                            word = line[:-2]
                            if len(word) != length or not word.isalpha():
                                continue
                            scramble = ''.join(sorted(word))
                            tinydict_words.add(word)
                            tinydict_scrambles.add(scramble)

                        smalldict_words = set()
                        smalldict_scrambles = set()
                        for line in smalldict:
                            word = line[:-2]
                            if len(word) != length or not word.isalpha():
                                continue
                            scramble = ''.join(sorted(word))
                            if scramble in tinydict_scrambles:
                                smalldict_words.add(word)
                                smalldict_scrambles.add(scramble)

                        scramble_map = collections.defaultdict(list)
                        for line in mediumdict:
                            word = line[:-2]
                            if len(word) != length or not word.isalpha():
                                continue
                            scramble = ''.join(sorted(word))
                            if scramble in smalldict_scrambles:
                                if word in tinydict_words and word in smalldict_words:
                                    scramble_map[scramble].insert(0, word)
                                else:
                                    print word
                                    scramble_map[scramble].append(word)

                        for line in bigdict:
                            word = line[:-1]
                            if len(word) != length:
                                continue
                            scramble = ''.join(sorted(word))
                            if scramble in scramble_map and word not in scramble_map[scramble]:
                                scramble_map[scramble].append(word)

                        outfile.write(json.dumps(scramble_map))

if __name__ == "__main__":
    generateWordList(6)