import assert from "assert";
import { Problem } from '@/utils/types/problems';
import { Testcase } from "@/components/Workspace/ProblemDescription/Console/Console";
import { extractVariables } from "../functions/utilFunctions";

export const jumpGameHandler = (fn: any, index?: number, customTestcases?: Testcase[]) => {
    try {
        let nums = [
            [2, 3, 1, 1, 4],
            [3, 2, 1, 0, 4],
        ];
        let answers = [true, false];

        if (customTestcases) {
            for (let testcase of customTestcases) {
                let customTestInput = extractVariables(testcase.input);
                let customTestOutput = testcase.output;

                if (Array.isArray(customTestInput.nums)) {
                    nums.push(customTestInput.nums);
                }

                if (customTestOutput === "true") {
                    answers.push(true);
                } else if (customTestOutput === "false") {
                    answers.push(false);
                }
            }
        }

        if (index !== undefined) {
            const result = fn(nums[index]);
            assert.equal(result, answers[index]);
            return true;
        } else {
            for (let i = 0; i < nums.length; i++) {
                const result = fn(nums[i]);
                assert.equal(result, answers[i]);
            }
            return true;
        }
    } catch (error: any) {
        console.log("Error from jumpGameHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeJumpGameJS = `function canJump(nums) {
  // Write your code here
};`;

export const jumpGame: Problem = {
	id: "jump-game",
	title: "3. Jump Game",
	problemStatement: `<p class='mt-3'>
    You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
    and each element in the array represents your maximum jump length at that position.
  </p>
    <p class='mt-3'>
    Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
    </p>
  `,

	examples: [
		{
			id: 0,
			inputText: `nums = [2,3,1,1,4]`,
			outputText: `true`,
			explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
		},
		{
			id: 1,
			inputText: `nums = [3,2,1,0,4]`,
			outputText: `false`,
			explanation:
				"You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
		},
	],
	constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
	starterCode: starterCodeJumpGameJS,
	handlerFunction: jumpGameHandler,
	starterFunctionName: "function canJump(",
	order: 3,
};